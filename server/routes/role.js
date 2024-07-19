import express from 'express';
import Role from '../models/Role.js';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Unauthorized'); // 确保有返回值
};

const checkRoles = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).send('Forbidden'); // 确保有返回值
  };
};

// 创建角色
router.post('/', isAuthenticated, checkRoles(['admin']), async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const newRole = new Role({ name, permissions });
    const role = await newRole.save();
    return res.json(role); // 确保有返回值
  } catch (err) {
    console.error(err); // 添加错误日志
    return res.status(500).send('Server error'); // 确保有返回值
  }
});

// 获取所有角色
router.get('/', isAuthenticated, checkRoles(['admin']), async (req, res) => {
  try {
    const roles = await Role.find();
    return res.json(roles); // 确保有返回值
  } catch (err) {
    console.error(err); // 添加错误日志
    return res.status(500).send('Server error'); // 确保有返回值
  }
});

export default router;
