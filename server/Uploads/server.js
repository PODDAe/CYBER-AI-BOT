const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('AI error');
  }
});

app.post('/api/upload', upload.array('files'), (req, res) => {
  res.json({ message: 'Files uploaded successfully', files: req.files });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));