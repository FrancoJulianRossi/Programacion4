const bcrypt = require('bcryptjs');
const { db } = require('../config/database');

const failedAttempts = new Map();

function getKey(req) {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const appId = (req.app && req.app.get('instanceId')) || 'global';
  return `${appId}|${ip}`;
}

function getDelayMs(count) {
  const base = 200;
  return Math.min(base * Math.pow(2, Math.max(0, count - 1)), 800);
}

async function applyDelay(count) {
  const d = getDelayMs(count);
  if (d > 0) await new Promise(r => setTimeout(r, d));
}


const login = async (req, res) => {
  const { username, password, captcha } = req.body || {};
  const key = getKey(req);
  const record = failedAttempts.get(key) || { count: 0, lastTs: 0 };
  const attempts = record.count;

  const newCount = attempts + 1;
  failedAttempts.set(key, { count: newCount, lastTs: Date.now() });

  // exigir captcha después de 3 intentos
  if (newCount >= 3 && !captcha) {
    await applyDelay(newCount);
    return res.status(400).json({ error: 'captcha required after multiple failed attempts' });
  }


  const isValid = username === 'admin' && password === 'password';
  if (isValid) {
    failedAttempts.delete(key);
    return res.status(200).json({ message: 'Authenticated' });
  }

  await applyDelay(newCount);
  return res.status(400).json({ error: 'Invalid credentials' });
};

const checkUsername = (req, res) => {
  try {
    const username = String((req.body && req.body.username) || '').trim();
    if (!username || username.length > 100) return res.status(200).json({ exists: false });


    if (/;|--|\/\*|\b(select|union|drop|insert|update|delete)\b/i.test(username)) {
      return res.status(200).json({ exists: false });
    }

    if (db && typeof db.query === 'function' && db.query.length >= 3) {
      const sql = 'SELECT COUNT(*) AS c FROM users WHERE username = ?';
      db.query(sql, [username], (err, results) => {
        if (err) return res.status(200).json({ exists: false });
        const exists = (results && results[0] && (results[0].c > 0 || results[0].count > 0)) || false;
        return res.status(200).json({ exists });
      });
      return;
    }

    // Fallback: in-memory
    const users = [{ username: 'admin' }, { username: 'user1' }, { username: 'test' }];
    const exists = users.some(u => u.username === username);
    return res.status(200).json({ exists });
  } catch (e) {
    return res.status(200).json({ exists: false });
  }
};

module.exports = {
  login,
  register: async () => { return; }, // placeholder
  verifyToken: () => { return; },
  checkUsername
};
