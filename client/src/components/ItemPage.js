import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('/api/items');
        setItems(res.data);
      } catch (err) {
        setMessage('Error fetching items');
      }
    };

    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const newItem = { name, description, category, quantity };
      const res = await axios.post('/api/items', newItem, {
        headers: { 'x-auth-token': '<Your_Manager_Token>' }
      });
      setItems([...items, res.data]);
      setMessage('Item added successfully');
    } catch (err) {
      setMessage('Error adding item');
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <form onSubmit={addItem}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
        </div>
        <button type="submit">Add Item</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name} - {item.description} - {item.category} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemPage;
