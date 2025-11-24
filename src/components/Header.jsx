import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Recibimos 'user' y 'onLogout' como nuevas propiedades
function Header({ totalItems, user, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <div className="logo-placeholder">R</div>
          <h2>Mi Restaurante</h2>
        </Link>
        
        <nav className="header-nav">
          <Link to="/">Menú</Link>
          <Link to="/mis-pedidos">Mis Pedidos</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
        
        <div className="header-actions">
          {/* LÓGICA DE USUARIO */}
          {user ? (
            <div className="user-info">
              <span className="user-name">Hola, {user.name.split(' ')[0]}</span>
              <button onClick={onLogout} className="btn-logout" title="Salir">Cerrar</button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">
              Ingresar
            </Link>
          )}

          <div className="action-icon cart-icon">
            🛒
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;