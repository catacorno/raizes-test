import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Pedidos.css";

const ORDERS_KEY = "siarn_orders";

function Pedidos() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];

    const userOrders = storedOrders.filter(
      (order) =>
        String(order.customerId) === String(user?.id)
    );

    setOrders(
      userOrders.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
    );
  }, [user]);

  const statusSteps = [
    "Recebido",
    "Em preparação",
    "Pronto",
    "Finalizado",
  ];

  function getStatusIndex(status) {
    return statusSteps.indexOf(status);
  }

    function getStatusLabel(status) {
      const labels = {
        Recebido: "Pedido recebido",
        "Em preparação": "Em preparação",
        Pronto: "Pronto para retirada",
        Finalizado: "Finalizado",
        Cancelado: "Cancelado",
      };

      return labels[status] || "Pedido recebido";
    }

    function getStatusIcon(status) {
      const icons = {
        Recebido: "bi-check-circle",
        "Em preparação": "bi-box-seam",
        Pronto: "bi-shop",
        Finalizado: "bi-check2-circle",
        Cancelado: "bi-x-circle",
      };

      return icons[status] || "bi-check-circle";
    }

    function getStatusClass(status) {
  const classes = {
    Recebido: "recebido",
    "Em preparação": "preparando",
    Pronto: "pronto",
    Finalizado: "finalizado",
    Cancelado: "cancelado",
  };

  return classes[status] || "recebido";
}
  function formatDate(date) {
    return new Date(date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  }

  function formatPrice(value) {
    return Number(value).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  return (
    <div className="orders-page">

      <section className="orders-header">
        <div className="orders-container">

          <span>
            HISTÓRICO DE COMPRAS
          </span>

          <h1>
            Meus pedidos
          </h1>

          <p>
            Acompanhe seus pedidos e consulte
            suas compras anteriores.
          </p>

        </div>
      </section>


      <section className="orders-section">
        <div className="orders-container">

          {orders.length > 0 ? (

            <div className="orders-list">

              {orders.map((order) => {

                const currentStatusIndex =
                  getStatusIndex(order.status);

                const isCancelled =
                  order.status === "Cancelado";

                return (
                  <article
                    className="order-card"
                    key={order.id}
                  >

                    <div className="order-card-header">

                      <div>

                        <span className="order-label">
                          PEDIDO
                        </span>

                        <h2>
                          #{String(order.id).slice(-6)}
                        </h2>

                        <p>
                          Realizado em{" "}
                          {formatDate(order.createdAt)}
                        </p>

                      </div>

                      <div
                        className={`order-status status-${getStatusClass(
                              order.status
                          )}`}
                      >
                        <i
                          className={`bi ${getStatusIcon(
                            order.status
                          )}`}
                        ></i>

                        {getStatusLabel(
                          order.status
                        )}
                      </div>

                    </div>


                    {!isCancelled && (

                      <div className="order-progress">

                        {statusSteps.map(
                          (status, index) => {

                            const isCompleted =
                              index <=
                              currentStatusIndex;

                            const isCurrent =
                              index ===
                              currentStatusIndex;

                            return (
                              <div
                                className={`order-progress-step ${
                                  isCompleted
                                    ? "completed"
                                    : ""
                                } ${
                                  isCurrent
                                    ? "current"
                                    : ""
                                }`}
                                key={status}
                              >

                                <div className="order-progress-marker">

                                  {isCompleted ? (
                                    <i className="bi bi-check-lg"></i>
                                  ) : (
                                    <span>
                                      {index + 1}
                                    </span>
                                  )}

                                </div>

                                <span>
                                  {status}
                                </span>

                                {index <
                                  statusSteps.length -
                                    1 && (
                                  <div className="order-progress-line"></div>
                                )}

                              </div>
                            );
                          }
                        )}

                      </div>

                    )}


                    {isCancelled && (

                      <div className="order-progress-cancelled">

                        <i className="bi bi-x-circle"></i>

                        <div>
                          <strong>
                            Pedido cancelado
                          </strong>

                          <span>
                            Este pedido não seguirá para as próximas etapas.
                          </span>
                        </div>

                      </div>

                    )}


                    <div className="order-items">

                      {order.items?.map((item) => (

                        <div
                          className="order-item"
                          key={`${order.id}-${item.id}`}
                        >

                          <div className="order-item-image">
                            {item.image || "🛍️"}
                          </div>

                          <div className="order-item-info">

                            <strong>
                              {item.name}
                            </strong>

                            <span>
                              {item.quantity}x{" "}
                              {formatPrice(item.price)}
                            </span>

                          </div>

                          <strong>
                            {formatPrice(
                              item.price *
                              item.quantity
                            )}
                          </strong>

                        </div>

                      ))}

                    </div>


                      <div className="order-card-footer">

                        <div>

                          <span>
                            Total
                          </span>

                          <strong>
                            {formatPrice(
                              order.subtotal
                            )}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Pontos ganhos
                          </span>

                          <strong className="order-points">
                            +{order.earnedPoints || 0}
                          </strong>

                        </div>

                        <Link
                          to={`/pedidos/${order.id}`}
                          className="order-details-link"
                        >
                          Ver detalhes
                          <i className="bi bi-arrow-right"></i>
                        </Link>

                      </div>


                    <Link
                      to={`/pedido/${order.id}`}
                      className="order-details-link"
                    >
                      <span>
                        Acompanhar pedido
                      </span>

                      <i className="bi bi-arrow-right"></i>
                    </Link>

                  </article>
                );
              })}

            </div>

          ) : (

            <div className="orders-empty">

              <div className="orders-empty-icon">
                <i className="bi bi-receipt"></i>
              </div>

              <h2>
                Você ainda não fez nenhum pedido
              </h2>

              <p>
                Quando realizar uma compra,
                ela aparecerá aqui.
              </p>

              <Link
                to="/produtos"
                className="orders-primary-button"
              >
                <i className="bi bi-bag"></i>
                Explorar produtos
              </Link>

            </div>

          )}

        </div>
      </section>

    </div>
  );
}

export default Pedidos;