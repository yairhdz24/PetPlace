// Main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Ventas }  from './pages/Ventas';
import { Clientes } from './pages/Clientes';
import { CortesCaja } from './pages/CortesCaja';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/Corte-Caja" element={<CortesCaja />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
