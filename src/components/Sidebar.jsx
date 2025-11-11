import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-placeholder">R</div>
        <h2>Mi Restaurante</h2>
      </div>
      <nav className="sidebar-nav">
        <Link to="/">Inicio</Link>
        <Link to="/menu">Ver Menú</Link>
        <Link to="/mis-pedidos">Mis Pedidos</Link> {}
        <Link to="/contacto">Contacto</Link>
      </nav>
    </div>
  );
}

export default Sidebar;