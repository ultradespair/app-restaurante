import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BoletaModal from './components/BoletaModal';
import ProductModal from './components/ProductModal';

import './Layout.css'; 


const NUMERO_RESTAURANTE = "51945855510"; 

const getInitialPedido = () => {
  const savedPedido = localStorage.getItem('miPedidoRestaurante');
  if (!savedPedido) return [];
  
  let parsedPedido = [];
  try {
    parsedPedido = JSON.parse(savedPedido);
  } catch (e) {
    return [];
  }

  if (parsedPedido.length === 0) return [];

  if (parsedPedido[0].uniqueId === undefined || parsedPedido[0].quantity === undefined) {
    const itemsAgrupados = {};
    parsedPedido.forEach(item => {
      const uniqueId = item.id; 
      const price = item.price || 0;
      
      if (itemsAgrupados[uniqueId]) {
        itemsAgrupados[uniqueId].quantity += 1;
      } else {
        itemsAgrupados[uniqueId] = {
          ...item,
          price: price,
          quantity: 1,
          uniqueId: uniqueId,
          variantName: item.variantName || null,
        };
      }
    });
    
    const nuevoPedidoMigrado = Object.values(itemsAgrupados);
    localStorage.setItem('miPedidoRestaurante', JSON.stringify(nuevoPedidoMigrado));
    return nuevoPedidoMigrado;
  }
  
  return parsedPedido;
};

function App() {
  const [pedido, setPedido] = useState(getInitialPedido());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [productModal, setProductModal] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('miRestauranteUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (pedido) {
      localStorage.setItem('miPedidoRestaurante', JSON.stringify(pedido));
    }
  }, [pedido]);

  const handleRegister = (userData) => {
    localStorage.setItem('miRestauranteUserDB', JSON.stringify(userData));
    setUser(userData);
    localStorage.setItem('miRestauranteUser', JSON.stringify(userData));
  };

  const handleLogin = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('miRestauranteUserDB'));
    
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      localStorage.setItem('miRestauranteUser', JSON.stringify(storedUser));
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('miRestauranteUser');
  };

  const handleProductClick = (item) => {
    if (item.variants && item.variants.length > 0) {
      setProductModal(item);
    } else {
      addItemToCart(item);
    }
  };

  const addItemToCart = (item, variant = null) => {
    const uniqueId = variant ? `${item.id}-${variant.name}` : item.id;
    const price = variant ? variant.price : item.price;
    const variantName = variant ? variant.name : null;
    
    const existingItem = pedido.find(p => p.uniqueId === uniqueId);

    if (existingItem) {
      const nuevoPedido = pedido.map(p =>
        p.uniqueId === uniqueId ? { ...p, quantity: p.quantity + 1 } : p
      );
      setPedido(nuevoPedido);
    } else {
      const newItem = {
        ...item,
        price: price,
        variantName: variantName,
        quantity: 1,
        uniqueId: uniqueId,
      };
      delete newItem.variants; 
      setPedido([...pedido, newItem]);
    }
  };

  const handleIncreaseQuantity = (uniqueId) => {
    const nuevoPedido = pedido.map(p =>
      p.uniqueId === uniqueId ? { ...p, quantity: p.quantity + 1 } : p
    );
    setPedido(nuevoPedido);
  };

  const handleDecreaseQuantity = (uniqueId) => {
    let nuevoPedido = pedido.map(p =>
      p.uniqueId === uniqueId ? { ...p, quantity: p.quantity - 1 } : p
    );
    nuevoPedido = nuevoPedido.filter(p => p.quantity > 0);
    setPedido(nuevoPedido);
  };

  const totalCuenta = useMemo(() => {
    if (!pedido) return 0;
    return pedido.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [pedido]);

  const totalItemsEnCarrito = useMemo(() => {
    if (!pedido) return 0;
    return pedido.reduce((total, item) => total + item.quantity, 0);
  }, [pedido]);

  const handleConfirmarPedido = () => {
    if (!pedido || pedido.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    
    if (!user) {
      alert("Debes iniciar sesión para confirmar el pedido.");
      return;
    }

    const finalOrder = {
      id: 'PAY-' + Date.now(),
      date: new Date().toISOString(),
      items: pedido,
      total: totalCuenta,
      user: user.name
    };

    const history = JSON.parse(localStorage.getItem('orderHistory')) || [];
    history.push(finalOrder);
    localStorage.setItem('orderHistory', JSON.stringify(history));
    
    setConfirmedOrder(finalOrder);
    setIsModalOpen(true);
    setPedido([]);

    let mensaje = `Hola, soy *${user.name}* y quiero realizar el siguiente pedido:\n\n`;
    mensaje += `🆔 *Pedido ID:* ${finalOrder.id}\n`;
    mensaje += `📅 *Fecha:* ${new Date().toLocaleDateString()}\n`;
    mensaje += `-----------------------------------\n`;

    finalOrder.items.forEach((item) => {
      const quantity = item.quantity || 0;
      const variant = item.variantName ? `(${item.variantName})` : '';
      const price = (item.price * quantity).toFixed(2);
      mensaje += `▪️ *${quantity}x ${item.name} ${variant}* - S/ ${price}\n`;
    });

    mensaje += `-----------------------------------\n`;
    mensaje += `💰 *TOTAL A PAGAR: S/ ${finalOrder.total.toFixed(2)}*\n\n`;
    mensaje += `Espero su confirmación. ¡Gracias!`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${NUMERO_RESTAURANTE}?text=${mensajeCodificado}`, '_blank');
  };

  return (
    <div className="app-layout-horizontal">
      <Header totalItems={totalItemsEnCarrito} user={user} onLogout={handleLogout} />
      
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <MenuPage 
                pedido={pedido}
                totalCuenta={totalCuenta}
                handleProductClick={handleProductClick}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleConfirmarPedido={handleConfirmarPedido}
              />
            } 
          />
          <Route path="/mis-pedidos" element={<HistoryPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/registro" element={<RegisterPage onRegister={handleRegister} />} />
        </Routes>
      </main>
      
      <Footer />

      {isModalOpen && (
        <BoletaModal 
          order={confirmedOrder} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
      {productModal && (
        <ProductModal 
          product={productModal}
          onClose={() => setProductModal(null)}
          onAddToCart={addItemToCart}
        />
      )}
    </div>
  );
}

export default App;