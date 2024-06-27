const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// 在这里存储笔记的文本和嵌入向量
let notes = [];

// 存储笔记的 API
app.post('/api/notes', async (req, res) => {
  const { text, title, url, time } = req.body;
  console.log('Received note:', req.body); // 添加日志
  try {
    const response = await axios.post('https://open.bigmodel.cn/api/text_embedding', {
      text
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 0074ea488c4c30f367b308dd5d10ace0.OqruFnazyFmmCgZ9'
      }
    });

    const embedding = response.data.embedding;
    const newNote = { id: Date.now(), text, title, url, time, embedding };
    notes.push(newNote);
    console.log('Note stored:', newNote); // 添加日志
    res.status(201).send(newNote);
  } catch (error) {
    console.error('Failed to store note:', error); // 添加日志
    res.status(500).send('Failed to store note');
  }
});

// 搜索笔记的 API
app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  console.log('Search query:', query); // 添加日志
  try {
    const response = await axios.post('https://open.bigmodel.cn/api/text_embedding', {
      text: query
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 0074ea488c4c30f367b308dd5d10ace0.OqruFnazyFmmCgZ9'
      }
    });

    const queryEmbedding = response.data.embedding;
    const distances = notes.map(note => ({
      ...note,
      distance: cosineSimilarity(queryEmbedding, note.embedding)
    }));

    distances.sort((a, b) => b.distance - a.distance);
    res.send(distances.slice(0, 3));
  } catch (error) {
    console.error('Failed to search notes:', error); // 添加日志
    res.status(500).send('Failed to search notes');
  }
});

// 计算余弦相似度的函数
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
