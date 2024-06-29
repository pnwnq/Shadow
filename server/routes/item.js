// server/routes/item.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Item = require('../models/Item');

// 创建物品
router.post('/', authMiddleware(['admin', 'manager']), async (req, res) => {
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
    res.json(item);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// 获取所有物品
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// 更新物品
router.put('/:id', authMiddleware(['admin', 'manager']), async (req, res) => {
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
    res.json(item);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// 删除物品
router.delete('/:id', authMiddleware(['admin', 'manager']), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    await item.remove();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
