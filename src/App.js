import React from 'react';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './pages/Admin';
import Basket from './pages/Basket';
import Discounts from './pages/Discounts';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/basket" element={<Basket />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/discounts" element={<Discounts />} />


      <Route path="/" element={<Home />} />
        
    </Routes>
    </BrowserRouter>
  )
}


export default App;
