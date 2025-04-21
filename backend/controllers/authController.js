import db from '../db.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const apiKey = crypto.randomBytes(24).toString('hex');

  db.query('INSERT INTO users (username, email, password, api_key) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, apiKey],
    (err) => {
      if (err) return res.status(500).json({ message: 'Gagal mendaftar', error: err });
      res.status(201).json({ message: 'Akun berhasil dibuat', apiKey });
    }
  );
};

export const login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'User tidak ditemukan' });

    const valid = await bcrypt.compare(password, results[0].password);
    if (!valid) return res.status(403).json({ message: 'Password salah' });

    res.json({ message: 'Login sukses', apiKey: results[0].api_key });
  });
};
