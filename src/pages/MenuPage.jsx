import React, { useState, useMemo } from 'react';
import QuantityInput from '../components/QuantityInput';
import HeroSlider from '../components/HeroSlider';

const menuData = [
  { id: 1, name: 'Lomo Saltado', price: 35.00, img: '/images/lomo-saltado.jpg', category: 'Platos de Fondo' },
  { id: 2, name: 'Ají de Gallina', price: 30.00, img: '/images/aji-de-gallina.jpg', category: 'Platos de Fondo' },
  { id: 3, name: 'Ceviche Mixto', price: 40.00, img: '/images/ceviche.png', category: 'Platos de Fondo' },
  { id: 4, name: 'Arroz con Pollo', price: 28.00, img: '/images/arroz-con-pollo.jpg', category: 'Platos de Fondo' },
  { id: 7, name: 'Papa a la Huancaína', price: 15.00, img: '/images/huancaina.jpg', category: 'Entradas' },
  { id: 8, name: 'Causa Limeña', price: 18.00, img: '/images/causa.jpg', category: 'Entradas' },
  { id: 5, name: 'Gaseosa Personal', price: 3.00, img: '/images/gaseosas.png', category: 'Bebidas',
    variants: [
      { name: 'Inca Kola 500ml', price: 3.00 },
      { name: 'Coca-Cola 500ml', price: 3.00 },
    ]
  },
  { id: 6, name: 'Pisco Sour', price: 15.00, img: '/images/pisco-sour.jpg', category: 'Bebidas' },
  { id: 9, name: 'Jarra de Chicha', price: 12.00, img: '/images/chicha.jpg', category: 'Bebidas' },
];

const categories = ['Todos', 'Platos de Fondo', 'Entradas', 'Bebidas'];

function MenuPage({ 
  pedido, 
  totalCuenta, 
  handleProductClick, 
  handleIncreaseQuantity, 
  handleDecreaseQuantity, 
  handleConfirmarPedido 
}) {
  
  const [numPersonas, setNumPersonas] = useState(1);
  const [categoriaActual, setCategoriaActual] = useState('Todos');

  const handleInputPersonas = (e) => {
    let valor = parseInt(e.target.value, 10);
    if (valor < 1 || isNaN(valor)) { valor = 1; }
    setNumPersonas(valor);
  };

  const totalPorPersona = useMemo(() => {
    if (totalCuenta === 0 || numPersonas === 0) return 0;
    return totalCuenta / numPersonas;
  }, [totalCuenta, numPersonas]);

  const menuFiltrado = useMemo(() => {
    if (categoriaActual === 'Todos') {
      return menuData;
    }
    return menuData.filter(item => item.category === categoriaActual);
  }, [categoriaActual]);

  return (
    <>
      <HeroSlider />
      
      <div className="main-layout">
        <div className="menu-column">
          <h2>Menú Principal</h2>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${categoriaActual === category ? 'active' : ''}`}
                onClick={() => setCategoriaActual(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            {menuFiltrado.map((item) => (
              <div className="menu-card" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="menu-card-info">
                  <h3>{item.name}</h3>
                  <p>
                    {item.variants ? 'Ver opciones' : `S/ ${item.price.toFixed(2)}`}
                  </p>
                  <button 
                    className="add-button"
                    onClick={() => handleProductClick(item)}
                  >
                    {item.variants ? 'Elegir' : 'Agregar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-column">
          <div className="order-card">
            <h2>Mi Pedido</h2>
            <div className="order-list">
              {!pedido || pedido.length === 0 ? (
                <p>Agrega productos del menú.</p>
              ) : (
                pedido.map((item) => (
                  <div className="order-item" key={item.uniqueId}>
                    <div className="order-item-details">
                      <span>{item.name}</span>
                      {item.variantName && (
                        <span className="item-variant-name">({item.variantName})</span>
                      )}
                      <strong>S/ {(item.price || 0).toFixed(2)}</strong>
                    </div>
                    <QuantityInput 
                      quantity={item.quantity || 0}
                      onIncrease={() => handleIncreaseQuantity(item.uniqueId)}
                      onDecrease={() => handleDecreaseQuantity(item.uniqueId)}
                    />
                  </div>
                ))
              )}
            </div>

            <div className="total-line">
              <span>TOTAL:</span>
              <span>S/ {totalCuenta.toFixed(2)}</span>
            </div>

            <div className="bill-splitter">
              <h3>Dividir la Cuenta</h3>
              <div className="split-controls">
                <label htmlFor="personas">Entre:</label>
                <input 
                  id="personas"
                  type="number" 
                  min="1"
                  value={numPersonas}
                  onChange={handleInputPersonas}
                />
                <label>persona(s)</label>
              </div>
              <div className="split-result">
                <h4>Cada uno paga: S/ {totalPorPersona.toFixed(2)}</h4>
              </div>
            </div>

            <button 
              className="btn-primary" 
              style={{width: '100%', marginTop: '20px'}}
              onClick={handleConfirmarPedido}
              disabled={!pedido || pedido.length === 0}
            >
              Confirmar Pedido y Ver Boleta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuPage;