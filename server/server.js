// server/server.js
const express = require('express');
const connectDB = require('./config/db');
const app = express();

// 连接数据库
connectDB();

const PORT = process.env.PORT || 5000;

// 中间件
app.use(express.json());

// 路由
app.use('/api/auth', require('./routes/auth'));

// 基本路由
app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
