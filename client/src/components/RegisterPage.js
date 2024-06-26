import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // 调试信息
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      console.log('Response:', res.data); // 调试信息
      setMessage(res.data.msg); // 设置成功消息
    } catch (err) {
      console.log('Error:', err); // 调试信息
      setMessage(err.response ? err.response.data.msg : 'Server Error'); // 设置错误消息
    }
    setShowModal(true); // 显示弹窗
  };

  const closeModal = () => {
    setShowModal(false); // 关闭弹窗
    setMessage(''); // 清除消息
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {showModal && <Modal message={message} onClose={closeModal} />} {/* 传递message给Modal */}
    </div>
  );
};

export default RegisterPage;
