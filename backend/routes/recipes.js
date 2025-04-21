import express from 'express';
import axios from 'axios';
import {verifyApiKey} from '../middleware/verifyApiKey.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/search', verifyApiKey, async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        query,
        number: 10,
        apiKey: process.env.SPOONACULAR_KEY,
      },
    });

    const results = response.data.results;
    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Gagal mengambil data dari Spoonacular', error: error.message });
  }
});

export default router;
