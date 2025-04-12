const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/ASO/parse', async (req, res) => {
  const input = req.query.input;
  if (!input) return res.status(400).json({ error: "Missing input parameter" });

  try {
    const response = await axios.get(`http://homeopathy.runasp.net/api/ASO/parse?input=${encodeURIComponent(input)}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from external API" });
  }
});

app.get('/api/ASO/article', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing url parameter" });

  try {
    const response = await axios.get(`http://homeopathy.runasp.net/api/ASO/article?url=${encodeURIComponent(url)}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from external API" });
  }
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
