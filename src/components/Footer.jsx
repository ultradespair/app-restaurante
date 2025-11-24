import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column footer-about">
          <div className="logo-placeholder">R</div>
          <p>El auténtico sabor de nuestra cocina, directo a tu paladar.</p>
        </div>
        
        <div className="footer-column">
          <h4>Ayuda</h4>
          <a href="#">Preguntas Frecuentes</a>
          <a href="#">Delivery</a>
          <a href="#">Libro de Reclamaciones</a>
        </div>
        
        <div className="footer-column">
          <h4>Información</h4>
          <a href="#">Nosotros</a>
          <a href="#">Políticas de Privacidad</a>
          <a href="#">Términos y Condiciones</a>
        </div>
        
        <div className="footer-column">
          <h4>Contacto</h4>
          <p>Tel: (01) 420 636</p>
          <p>Av. Siempre Viva 123</p>
          <p>reservas@mi-restaurante.com</p>
        </div>
        
        <div className="footer-column">
          <h4>Síguenos en:</h4>
          <div className="social-icons">
            <a href="#" className="social-icon">f</a>
            <a href="#" className="social-icon">i</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Mi Restaurante. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;