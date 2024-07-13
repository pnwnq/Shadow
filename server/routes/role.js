import express from 'express';
import Role from '../models/Role.js';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

const checkRoles = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    res.status(403).send('Forbidden');
  };
};

// 创建角色
router.post('/', isAuthenticated, checkRoles(['admin']), async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const newRole = new Role({ name, permissions });
    const role = await newRole.save();
    res.json(role);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// 获取所有角色
router.get('/', isAuthenticated, checkRoles(['admin']), async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;
