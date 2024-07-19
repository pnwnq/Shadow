import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import multer from 'multer';
import connectDB from '../config/db.js';
import passport from '../config/passport.js';
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/item.js';
import roleRoutes from './routes/role.js';

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
  optionsSuccessStatus: 204, // 一些旧的浏览器对204的处理
};

// 启用CORS
app.use(cors(corsOptions));

// 使用 JSON 中间件
app.use(express.json());

// 使用 session 中间件
app.use(
  session({ secret: 'your_secret', resave: false, saveUninitialized: true }),
);

// 初始化 Passport 中间件
app.use(passport.initialize());
app.use(passport.session());

// 配置 Multer 文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 设置文件上传路径
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // 设置文件名
  },
});

const upload = multer({ storage });

// 文件上传路由
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ message: '文件上传成功', file: req.file });
  } catch (err) {
    res.status(500).json({ message: '文件上传失败', error: err.message });
  }
});

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
  // 确保调用 next() 传递错误到下一个中间件
  next(err);
  return null; // 确保中间件有返回值
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
