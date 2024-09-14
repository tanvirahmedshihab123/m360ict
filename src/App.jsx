// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './features/products/List';
import ProductDetail from './features/products/ProductDetail';
import ProductEdit from './features/products/ProductEdit';
import Navbar from './Navbar/Navbar';

function App() {
  return ( <>
    
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
