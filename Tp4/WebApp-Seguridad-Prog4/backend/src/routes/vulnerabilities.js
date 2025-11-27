const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = express.Router();
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');

router.use(cookieParser());

router.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'Strict',
    httpOnly: true
  }
}));

const csrfProtection = csrf({ cookie: true });

const allowedOrigins = ['http://localhost:3000'];

router.use((req, res, next) => {
    const origin = req.get('origin');
    if (origin && !allowedOrigins.includes(origin)) {
        return res.status(403).json({ error: 'Invalid Origin' });
    }
    next();
});

router.get('/csrf-token', csrfProtection, (req, res) => {
  const token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token, {
    sameSite: 'Strict',
    httpOnly: false
  });

  res.json({ csrfToken: token });
});

// Command Injection
router.post('/ping', vulnerabilityController.ping);

// CSRF - Transferencia protegida
router.post('/transfer', csrfProtection, vulnerabilityController.transfer);

// Local File Inclusion
router.get('/file', vulnerabilityController.readFile);

// File Upload protegido
router.post('/upload', csrfProtection, uploadMiddleware, uploadFile);

router.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'CSRF token invalid' });
  }
  next(err);
});

module.exports = router;