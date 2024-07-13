import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import session from 'express-session';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/item.js';
import roleRoutes from './routes/role.js';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const app = express();

// 连接数据库
connectDB();

const PORT = process.env.PORT || 5000;

// CORS配置
const corsOptions = {
  origin: '*', // 允许的前端URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的方法
  credentials: true, // 允许发送cookie
  allowedHeaders: 'Content-Type,Authorization', // 允许的请求头
  optionsSuccessStatus: 204 // 一些旧的浏览器对204的处理
};

// 启用CORS
app.use(cors(corsOptions));

// 使用 JSON 中间件
app.use(express.json());

// 使用 session 中间件
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));

// 初始化 Passport 中间件
app.use(passport.initialize());
app.use(passport.session());

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/role', roleRoutes);

// 基本路由
app.get('/', (req, res) => res.send('API Running'));

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err); // 输出详细的错误信息到控制台
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ msg: 'Invalid JSON', error: err.message });
  }
  next();
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
