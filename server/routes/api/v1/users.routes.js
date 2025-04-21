require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');

const BASE_URL = process.env.JSONPLACEHOLDER_BASE_URL;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      validateStatus: () => true,
    });

    if (response.status !== 200) {
      return res.status(response.status).json({ error: 'Failed to fetch users' });
    }

    res.json(response.data);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${req.params.id}`, {
      validateStatus: () => true,
    });

    if (response.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (response.status !== 200) {
      return res.status(response.status).json({ error: 'Failed to fetch user' });
    }

    res.json(response.data);
  } catch (err) {
    console.error(`Error fetching user ${req.params.id}:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${req.params.id}/posts`, {
      validateStatus: () => true,
    });

    if (response.status === 404) {
      return res.status(404).json({ error: 'User posts not found' });
    }

    if (response.status !== 200) {
      return res.status(response.status).json({ error: 'Failed to fetch user posts' });
    }

    res.json(response.data);
  } catch (err) {
    console.error(`Error fetching posts for user ${req.params.id}:`, err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
