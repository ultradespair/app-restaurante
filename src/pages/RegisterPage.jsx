import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function RegisterPage({ onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple
    if (!formData.name || !formData.email || !formData.password) {
      alert("Por favor completa todos los campos");
      return;
    }
    
    // Llamamos a la función que nos pasó App.jsx
    onRegister(formData);
    navigate('/'); // Redirigir al inicio
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>
      <p>Únete a nosotros para pedir más rápido</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input type="text" name="name" placeholder="Ej: Juan Pérez" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" name="email" placeholder="ejemplo@correo.com" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="password" placeholder="******" onChange={handleChange} />
        </div>
        
        <button type="submit" className="btn-primary">Registrarme</button>
      </form>

      <span className="auth-link">
        ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
      </span>
    </div>
  );
}

export default RegisterPage;