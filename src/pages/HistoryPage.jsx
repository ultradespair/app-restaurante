import React, { useState, useEffect } from 'react';
import BoletaModal from '../components/BoletaModal';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Cargar el historial desde localStorage cuando la página se monta
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    // Los ordenamos del más nuevo al más viejo
    setHistory(savedHistory.reverse());
  }, []);

  return (
    <>
      <div className="history-page-container">
        <h1>Mis Pedidos</h1>
        <p>Aquí puedes ver un historial de todos tus pedidos confirmados.</p>

        {history.length === 0 ? (
          <p>No tienes pedidos en tu historial.</p>
        ) : (
          <div className="history-list">
            {history.map((order) => (
              <div 
                key={order.id} 
                className="history-item" 
                onClick={() => setSelectedOrder(order)} // Al hacer clic, abre la boleta
              >
                <div className="history-item-info">
                  <strong>Pedido ID:</strong> {order.id}
                  <span>{new Date(order.date).toLocaleString()}</span>
                </div>
                <div className="history-item-total">
                  <span>Total: S/ {order.total.toFixed(2)}</span>
                  <button className="btn-view-detail">Ver Detalle</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reutilizamos el BoletaModal para ver el detalle del pedido */}
      {selectedOrder && (
        <BoletaModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </>
  );
}

export default HistoryPage;