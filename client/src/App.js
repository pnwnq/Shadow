import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import Counter from './components/Counter';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Counter />
      <Footer />
    </Router>
  );
}

export default App;
