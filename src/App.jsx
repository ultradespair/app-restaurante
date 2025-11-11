import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import HistoryPage from './pages/HistoryPage'; // Importar página
import './Layout.css'; 

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/mis-pedidos" element={<HistoryPage />} /> {/* Añadir ruta */}
        </Routes>
      </main>
    </div>
  );
}

export default App;