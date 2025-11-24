import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(email, password);
    if (success) {
      navigate('/');
    } else {
      alert("Correo o contraseña incorrectos (o el usuario no existe).");
    }
  };

  return (
    <div className="auth-container">
      <h2>Bienvenido de nuevo</h2>
      <p>Inicia sesión para continuar</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input 
            type="email" 
            placeholder="ejemplo@correo.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            placeholder="******" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn-primary">Ingresar</button>
      </form>

      <span className="auth-link">
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </span>
    </div>
  );
}

export default LoginPage;