// server/routes/auth.js
const express = require('express');
const router = express.Router();

// 用户注册路由
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // 简单的字段验证
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // 假设用户注册成功
  res.status(200).json({ msg: 'User registered successfully' });
});

// 用户登录路由
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 简单的字段验证
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // 假设用户登录成功
  res.status(200).json({ msg: 'User logged in successfully' });
});

module.exports = router;
