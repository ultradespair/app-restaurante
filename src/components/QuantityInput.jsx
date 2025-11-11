import React from 'react';

// Componente simple para manejar la cantidad
function QuantityInput({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="quantity-input">
      <button onClick={onDecrease} className="quantity-btn">-</button>
      <span className="quantity-value">{quantity}</span>
      <button onClick={onIncrease} className="quantity-btn">+</button>
    </div>
  );
}

export default QuantityInput;