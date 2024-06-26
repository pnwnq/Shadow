import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import RegisterPage from './components/RegisterPage'; // 引入RegisterPage组件
import LoginPage from './components/LoginPage'; // 引入LoginPage组件
import Footer from './components/Footer';
import Counter from './components/Counter';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* 添加RegisterPage路由 */}
        <Route path="/login" element={<LoginPage />} /> {/* 添加LoginPage路由 */}
      </Routes>
      <Counter />
      <Footer />
    </Router>
  );
};

export default App;
