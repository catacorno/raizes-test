import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useUnit } from "../../context/UnitContext";

import "./Carrinho.css";

function Carrinho() {
  const {
    cartItems,
    subtotal,
    totalItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { selectedUnit } = useUnit();

  const formattedSubtotal = subtotal
    .toFixed(2)
    .replace(".", ",");

  return (
    <div className="cart-page">

      <section className="cart-header">

        <div className="cart-container">

          <span>SEU PEDIDO</span>

          <h1>
            Meu carrinho
          </h1>

          <p>
            {totalItems === 0
              ? "Seu carrinho está vazio."
              : `${totalItems} item(ns) no seu carrinho.`}
          </p>

        </div>

      </section>


      <section className="cart-section">

        <div className="cart-container">

          {cartItems.length === 0 ? (

            <div className="cart-empty">

              <div className="cart-empty-icon">
                <i className="bi bi-cart-x"></i>
              </div>

              <h2>
                Seu carrinho está vazio
              </h2>

              <p>
                Explore nossos produtos e adicione
                seus favoritos ao carrinho.
              </p>

              <Link
                to="/produtos"
                className="cart-primary-button"
              >
                <i className="bi bi-bag"></i>
                Ver produtos
              </Link>

            </div>

          ) : (

            <div className="cart-layout">

              <div className="cart-products">

                <div className="cart-products-header">

                  <h2>
                    Produtos
                  </h2>

                  <button
                    type="button"
                    onClick={clearCart}
                  >
                    Limpar carrinho
                  </button>

                </div>


                {cartItems.map((item) => (

                  <article
                    className="cart-item"
                    key={item.id}
                  >

                    <div className="cart-item-image">
                      {item.image}
                    </div>


                    <div className="cart-item-info">

                      <span>
                        {item.category}
                      </span>

                      <h3>
                        {item.name}
                      </h3>

                      <small>
                        R$ {item.price
                          .toFixed(2)
                          .replace(".", ",")}{" "}
                        por unidade
                      </small>

                    </div>


                    <div className="cart-item-actions">

                      <div className="quantity-control">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                        >
                          <i className="bi bi-dash"></i>
                        </button>

                        <strong>
                          {item.quantity}
                        </strong>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                        >
                          <i className="bi bi-plus"></i>
                        </button>

                      </div>

                      <strong className="cart-item-total">
                        R${" "}
                        {(item.price * item.quantity)
                          .toFixed(2)
                          .replace(".", ",")}
                      </strong>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        title="Remover produto"
                      >
                        <i className="bi bi-trash"></i>
                      </button>

                    </div>

                  </article>

                ))}

              </div>


              <aside className="cart-summary">

                <h2>
                  Resumo do pedido
                </h2>


                {selectedUnit && (
                  <div className="cart-summary-unit">

                    <small>
                      UNIDADE
                    </small>

                    <strong>
                      <i className="bi bi-geo-alt-fill"></i>
                      {selectedUnit.name}
                    </strong>

                  </div>
                )}


                <div className="cart-summary-line">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    R$ {formattedSubtotal}
                  </strong>

                </div>


                <div className="cart-summary-line">

                  <span>
                    Entrega
                  </span>

                  <span>
                    A calcular
                  </span>

                </div>


                <div className="cart-summary-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    R$ {formattedSubtotal}
                  </strong>

                </div>


                <Link
                  to="/checkout"
                  className="cart-checkout-button"
                >
                  Continuar pedido
                  <i className="bi bi-arrow-right"></i>
                </Link>


                <Link
                  to="/produtos"
                  className="cart-continue-shopping"
                >
                  <i className="bi bi-arrow-left"></i>
                  Continuar comprando
                </Link>

              </aside>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Carrinho;