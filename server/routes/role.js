// server/routes/role.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Role = require('../models/Role');

// 创建角色
router.post('/', authMiddleware(['admin']), async (req, res) => {
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
router.get('/', authMiddleware(['admin']), async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
