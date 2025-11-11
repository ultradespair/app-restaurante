import React from 'react';

function BoletaModal({ order, onClose }) {
  if (!order) return null;

  const subtotal = order.total || 0; 
  const igv = subtotal * 0.18;
  const totalFinal = subtotal + igv;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose}>X</button>
        
        <div className="boleta-header">
          <div className="logo-placeholder">R</div>
          <h2>Boleta de Venta</h2>
        </div>

        <div className="boleta-details">
          <p><strong>Pedido ID:</strong> {order.id}</p>
          <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
        </div>

        <table className="boleta-table">
          <thead>
            <tr>
              <th>Cant.</th>
              <th>Producto</th>
              <th>P. Unit.</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => {
              const key = item.uniqueId || index;
              const quantity = item.quantity || 0;
              const price = item.price || 0;
              const name = item.name || "Producto";
              const totalItem = (price * quantity).toFixed(2);

              return (
                <tr key={key}>
                  <td>{quantity}</td>
                  <td>
                    {name}
                    {item.variantName && (
                      <span className="item-variant-name"> ({item.variantName})</span>
                    )}
                  </td>
                  <td>S/ {price.toFixed(2)}</td>
                  <td>S/ {totalItem}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="boleta-totals">
          <p><strong>Subtotal:</strong> S/ {subtotal.toFixed(2)}</p>
          <p><strong>IGV (18%):</strong> S/ {igv.toFixed(2)}</p>
          <h3><strong>Total a Pagar:</strong> S/ {totalFinal.toFixed(2)}</h3>
        </div>
        
      </div>
    </div>
  );
}

export default BoletaModal;