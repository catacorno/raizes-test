import "./ProductCard.css";

function ProductCard({ product, onAdd }) {
  const unavailable = product.stock <= 0;

  return (
    <article className="product-card">

      <div className="product-image">
        <span>{product.image}</span>

        {product.featured && (
          <span className="product-featured">
            Destaque
          </span>
        )}
      </div>

      <div className="product-content">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>
          {product.description}
        </p>

        <div className="product-footer">

          <div>
            <small>A partir de</small>

            <strong>
              R$ {product.price.toFixed(2).replace(".", ",")}
            </strong>
          </div>

          <button
            type="button"
            disabled={unavailable}
            onClick={() => onAdd(product)}
          >
            <i className="bi bi-cart-plus"></i>
            {unavailable ? "Esgotado" : "Adicionar"}
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;