const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // 引入cors中间件
const app = express();

// 连接数据库
connectDB();

const PORT = process.env.PORT || 5000;

// CORS配置
const corsOptions = {
  origin: 'http://localhost:3000', // 允许的前端URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的方法
  credentials: true, // 允许发送cookie
  optionsSuccessStatus: 204 // 一些旧的浏览器对204的处理
};

// 启用CORS
app.use(cors(corsOptions));

// 中间件
app.use(express.json());

// 路由
app.use('/api/auth', require('./routes/auth')); // 确保这里正确引入了auth路由

// 基本路由
app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
