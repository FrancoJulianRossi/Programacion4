const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req /*, res */) => {
    if (req.app) {
      let id = req.app.get('instanceId');
      if (!id) {
        id = Date.now().toString() + '-' + Math.random().toString(36).slice(2);
        req.app.set('instanceId', id);
      }
      return `${req.ip}-${id}`;
    }
    return req.ip;
  },
  handler: (req, res) => {
    return res.status(429).json({ error: 'Too many login attempts. Try again later.' });
  }
});

const failedAttempts = new Map();

// delay progresivo
function getDelayMs(count) {
  const base = 200; // ms
  const delay = base * Math.pow(2, Math.max(0, count - 1)); // 200, 400, 800, 1600...
  return Math.min(delay, 800); // max 800 ms para testeo
}

function isCaptchaRequired(count) {
  return count >= 3;
}

async function applyDelay(count) {
  const delay = getDelayMs(count);
  if (delay > 0) await new Promise(r => setTimeout(r, delay));
}

const users = [
  { username: 'admin' },
  { username: 'user1' },
  { username: 'test' }
];

// Rate limiter para el endpoint de check-username
const checkUsernameLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 5, // permitir pocos intentos
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    if (req.app) {
      let id = req.app.get('instanceId');
      if (!id) {
        id = Date.now().toString() + '-' + Math.random().toString(36).slice(2);
        req.app.set('instanceId', id);
      }
      return `${req.get('X-Forwarded-For') || req.ip || 'unknown'}-${id}`;
    }
    return req.get('X-Forwarded-For') || req.ip || 'unknown';
  },
  handler: (req, res) => {
    return res.status(429).json({ error: 'Too many attempts' });
  }
});

router.post('/check-username', checkUsernameLimiter, (req, res) => {
  try {
    const username = String((req.body && req.body.username) || '');
    if (!username || username.length > 100) {
      return res.status(200).json({ exists: false });
    }

    const exists = users.some(u => u.username === username);
    return res.status(200).json({ exists });
  } catch (e) {
    return res.status(200).json({ exists: false });
  }
});

// Endpoint de login con proteccion
router.post('/login', loginLimiter, async (req, res) => {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const appId = (req.app && req.app.get('instanceId')) || 'global';
  const mapKey = `${appId}|${ip}`;

  const { username, password, captcha } = req.body || {};

  const record = failedAttempts.get(mapKey) || { count: 0, lastTs: 0 };
  const attempts = record.count;

  const newCount = attempts + 1;
  failedAttempts.set(mapKey, { count: newCount, lastTs: Date.now() });

  if (isCaptchaRequired(newCount) && !captcha) {
    await applyDelay(newCount);
    return res.status(400).json({ error: 'captcha required after multiple failed attempts' });
  }

  const isValid = username === 'admin' && password === 'password';
  if (isValid) {
    failedAttempts.delete(mapKey);
    return res.status(200).json({ message: 'Authenticated' });
  }

  await applyDelay(newCount);

  const err = isCaptchaRequired(newCount)
    ? 'Invalid credentials. captcha required on next request.'
    : 'Invalid credentials';

  return res.status(400).json({ error: err });
});

module.exports = router;
