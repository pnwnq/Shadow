import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import RegisterPage from './components/RegisterPage'; // 引入RegisterPage组件
import LoginPage from './components/LoginPage'; // 引入LoginPage组件
import ItemPage from './components/ItemPage'; // 引入ItemPage组件
import Footer from './components/Footer';
import Counter from './components/Counter';
import MyDropzone from './components/MyDropzone'; // 引入MyDropzone组件

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/upload" element={<MyDropzone />} /> {/* 添加MyDropzone路由 */}
        <Route path="/dropzone" element={<MyDropzone />} /> {/* 新增的路由 */}
      </Routes>
      <Counter />
      <Footer />
    </Router>
  );
}

export default App;
