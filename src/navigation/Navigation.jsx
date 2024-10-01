// src/Navigation/Routes.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import AboutPage from '../pages/aboutpage/AboutPage';
import ContactPage from '../pages/contactpage/ContactPage';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
    
      </Routes>
    </Router>
  );
};

export default AppRoutes;
