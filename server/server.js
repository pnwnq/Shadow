// server/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(express.json());

// 路由
app.use('/api/auth', require('./routes/auth')); // 确保路径正确

// 基本路由
app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
