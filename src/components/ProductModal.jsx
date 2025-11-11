import React, { useState } from 'react';

function ProductModal({ product, onClose, onAddToCart }) {
  // Estado para saber qué variante está seleccionada
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const handleAddToCart = () => {
    // Pasa el producto y la variante seleccionada
    onAddToCart(product, selectedVariant);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>X</button>
        
        <h2>{product.name}</h2>
        <img src={product.img} alt={product.name} className="product-modal-img" />
        <p>Por favor, selecciona una opción:</p>

        <div className="variant-options">
          {product.variants.map((variant, index) => (
            <label key={index} className="variant-label">
              <input
                type="radio"
                name="variant"
                value={variant.name}
                checked={selectedVariant.name === variant.name}
                onChange={() => setSelectedVariant(variant)}
              />
              {variant.name} - <strong>S/ {variant.price.toFixed(2)}</strong>
            </label>
          ))}
        </div>

        <button className="btn-primary" style={{width: '100%'} } onClick={handleAddToCart}>
          Agregar al Pedido
        </button>
      </div>
    </div>
  );
}

export default ProductModal;