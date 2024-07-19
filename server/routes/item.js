import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Unauthorized');
};

const checkRoles = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).send('Forbidden');
  };
};

// 创建物品
router.post(
  '/',
  isAuthenticated,
  checkRoles(['admin', 'manager']),
  async (req, res) => {
    const { name, description, category, quantity } = req.body;
    try {
      const newItem = new Item({
        name,
        description,
        category,
        quantity,
        available: quantity,
      });
      const item = await newItem.save();
      return res.json(item);
    } catch (err) {
      console.error(err); // 添加错误日志
      return res.status(500).send('Server error');
    }
  },
);

// 获取所有物品
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    return res.json(items);
  } catch (err) {
    console.error(err); // 添加错误日志
    return res.status(500).send('Server error');
  }
});

// 更新物品
router.put(
  '/:id',
  isAuthenticated,
  checkRoles(['admin', 'manager']),
  async (req, res) => {
    const { name, description, category, quantity } = req.body;
    try {
      let item = await Item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ msg: 'Item not found' });
      }

      item.name = name || item.name;
      item.description = description || item.description;
      item.category = category || item.category;
      item.quantity = quantity || item.quantity;

      item = await item.save();
      return res.json(item);
    } catch (err) {
      console.error(err); // 添加错误日志
      return res.status(500).send('Server error');
    }
  },
);

// 删除物品
router.delete(
  '/:id',
  isAuthenticated,
  checkRoles(['admin', 'manager']),
  async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ msg: 'Item not found' });
      }

      await item.remove();
      return res.json({ msg: 'Item removed' });
    } catch (err) {
      console.error(err); // 添加错误日志
      return res.status(500).send('Server error');
    }
  },
);

export default router;
