import db from '../db.js';

const verifyApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey) {
    return res.status(401).json({ message: 'API Key dibutuhkan' });
  }

  db.query('SELECT * FROM users WHERE api_key = ?', [apiKey], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length === 0) return res.status(403).json({ message: 'API Key tidak valid' });

    req.user = results[0];
    next();
  });
};

export { verifyApiKey }; 