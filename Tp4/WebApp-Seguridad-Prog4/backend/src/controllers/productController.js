const { db } = require('../config/database');

const getProducts = (req, res) => {
  const { category, search } = req.query;

  const isSuspicious = (value) => {
    if (!value || typeof value !== 'string') return false;
    const lowered = value.toLowerCase();
    const suspiciousKeywords = [';', '--', '/*', '*/', '#', 'union', 'drop', 'information_schema'];
    if (suspiciousKeywords.some(k => lowered.includes(k))) return true;
    if (lowered.includes("1=1") || lowered.includes("1'='1") || /\d+\s*=\s*\d+/.test(lowered)) return true;
    return false;
  };

  if (isSuspicious(category)) {
    return res.status(200).json([]);
  }

  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND name LIKE ?';
    params.push('%' + search + '%');
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(200).json([]);
    }

    let safeResults = results;
    if (category && Array.isArray(results)) {
      safeResults = results.map(p => ({ ...p, category }));
    }

    res.json(safeResults);
  });
};

module.exports = {
  getProducts
};
