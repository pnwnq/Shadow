import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemPage() {
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
        headers: { 'x-auth-token': '<Your_Manager_Token>' },
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description} - {item.category} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemPage;
