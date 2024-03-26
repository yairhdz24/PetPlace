// Main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Pedidos  from './pages/Pedidos';
import Clientes from './pages/Clientes';
import HistorialPedidos from './pages/HistorialPedidos'
import { Prueba } from './components/prueba';

import './index.css';
import { Corte_Caja } from './pages/Corte_Caja';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/HistorialPedidos" element={<HistorialPedidos />} />
        <Route path="/CorteCaja" element={<Corte_Caja />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
