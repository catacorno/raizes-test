import { Link, useParams } from "react-router-dom";

import "./PedidoDetalhes.css";

function PedidoDetalhes() {
  const { id } = useParams();

  const savedOrders =
    localStorage.getItem("siarn_orders");

  const orders = savedOrders
    ? JSON.parse(savedOrders)
    : [];

  const order = orders.find(
    (item) => item.id === id
  );

  function formatPrice(value) {
    return Number(value)
      .toFixed(2)
      .replace(".", ",");
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("pt-BR");
  }

  function getPaymentName(payment) {
    if (payment === "pix") return "PIX";
    if (payment === "card") return "Cartão";
    return "Dinheiro";
  }

  function getDeliveryName(delivery) {
    if (delivery === "pickup") {
      return "Retirada na unidade";
    }

    return "Entrega";
  }

  function getStatusIcon(status) {
  const icons = {
    Recebido: "bi-check-lg",
    "Em preparação": "bi-box-seam",
    Pronto: "bi-shop",
    Finalizado: "bi-check2-all",
    Cancelado: "bi-x-lg",
  };

  return icons[status] || "bi-clock";
}

function getStatusMessage(status) {
  const messages = {
    Recebido:
      "Seu pedido foi recebido pelo SIARN.",

    "Em preparação":
      "Seu pedido está sendo preparado pela unidade.",

    "Pronto":
      "Seu pedido está pronto para retirada.",

    Finalizado:
      "Seu pedido foi finalizado. Obrigado pela preferência!",

    Cancelado:
      "Este pedido foi cancelado.",
  };

  return (
    messages[status] ||
    "Seu pedido está sendo processado."
  );
}
  const statusSteps = [
    "Recebido",
    "Em preparação",
    "Pronto",
    "Finalizado",
  ];

  function getStatusIndex(status) {
    return statusSteps.indexOf(status);
  }
  if (!order) {
    return (
      <div className="order-details-page">

        <div className="order-details-empty">

          <div className="order-details-empty-icon">
            <i className="bi bi-receipt"></i>
          </div>

          <h1>
            Pedido não encontrado
          </h1>

          <p>
            Não foi possível encontrar esse pedido.
          </p>

          <Link
            to="/pedidos"
            className="order-details-primary-button"
          >
            <i className="bi bi-arrow-left"></i>
            Voltar para meus pedidos
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="order-details-page">

      <section className="order-details-header">

        <div className="order-details-container">

          <Link
            to="/pedidos"
            className="order-details-back"
          >
            <i className="bi bi-arrow-left"></i>
            Meus pedidos
          </Link>

          <span>
            DETALHES DO PEDIDO
          </span>

          <h1>
            {order.id}
          </h1>

          <p>
            Realizado em {formatDate(order.createdAt)}
          </p>

        </div>

      </section>


      <section className="order-details-section">

        <div className="order-details-container">

 <div className="order-details-status">

  <div className="order-details-status-header">

    <div className="order-details-status-icon">
      <i className={`bi ${getStatusIcon(order.status)}`}></i>
    </div>

    <div>
      <strong>
        {order.status}
      </strong>

      <span>
        {getStatusMessage(order.status)}
      </span>
    </div>

  </div>


{order.status !== "Cancelado" ? (

  <div className="order-status-timeline">

    {statusSteps.map((status, index) => {

      const currentIndex =
        getStatusIndex(order.status);

      const isCompleted =
        index <= currentIndex;

      const isCurrent =
        index === currentIndex;

      return (
        <div
          className={`order-status-step ${
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

          <div className="order-status-step-marker">

            {isCompleted ? (
              <i className="bi bi-check-lg"></i>
            ) : (
              <span>
                {index + 1}
              </span>
            )}

          </div>

          <div className="order-status-step-content">

            <strong>
              {status}
            </strong>

            {isCurrent && (
              <span>
                Status atual
              </span>
            )}

          </div>

        </div>
      );
    })}

  </div>

) : (

  <div className="order-status-cancelled">

    <div className="order-status-cancelled-icon">
      <i className="bi bi-x-lg"></i>
    </div>

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
</div>


          <div className="order-details-grid">

            <main>

              <div className="order-details-card">

                <div className="order-details-card-heading">

                  <div>
                    <small>
                      PRODUTOS
                    </small>

                    <h2>
                      Itens do pedido
                    </h2>
                  </div>

                  <span>
                    {order.items.length}{" "}
                    {order.items.length === 1
                      ? "item"
                      : "itens"}
                  </span>

                </div>


                <div className="order-details-items">

                  {order.items.map((item) => (

                    <div
                      className="order-details-item"
                      key={item.id}
                    >

                      <div className="order-details-item-image">
                        {item.image}
                      </div>

                      <div className="order-details-item-info">

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          {item.quantity}x R${" "}
                          {formatPrice(item.price)}
                        </span>

                      </div>

                      <strong>
                        R${" "}
                        {formatPrice(
                          item.price *
                          item.quantity
                        )}
                      </strong>

                    </div>

                  ))}

                </div>


                <div className="order-details-total">

                  <span>
                    Total do pedido
                  </span>

                  <strong>
                    R${" "}
                    {formatPrice(order.subtotal)}
                  </strong>

                </div>
                <div className="order-details-points">

                  <span>
                    Pontos de fidelidade
                  </span>

                  <strong>
                    +{order.earnedPoints || 0} pontos
                  </strong>

                </div>

              </div>

            </main>


            <aside>

              <div className="order-details-card">

                <div className="order-details-card-heading">

                  <div>
                    <small>
                      INFORMAÇÕES
                    </small>

                    <h2>
                      Pedido
                    </h2>
                  </div>

                </div>


                <div className="order-info-list">

                  <div>
                    <i className="bi bi-shop"></i>

                    <div>
                      <small>
                        UNIDADE
                      </small>

                      <strong>
                        {order.unit?.name ||
                          "Unidade"}
                      </strong>
                    </div>
                  </div>


                  <div>
                    <i className="bi bi-credit-card"></i>

                    <div>
                      <small>
                        PAGAMENTO
                      </small>

                      <strong>
                        {getPaymentName(
                          order.paymentMethod
                        )}
                      </strong>
                    </div>
                  </div>


                  <div>
                    <i className="bi bi-box-seam"></i>

                    <div>
                      <small>
                        RECEBIMENTO
                      </small>

                      <strong>
                        {getDeliveryName(
                          order.deliveryMethod
                        )}
                      </strong>
                    </div>
                  </div>


                  <div>
                    <i className="bi bi-calendar3"></i>

                    <div>
                      <small>
                        DATA DO PEDIDO
                      </small>

                      <strong>
                        {formatDate(
                          order.createdAt
                        )}
                      </strong>
                    </div>
                  </div>

                </div>

              </div>


              <Link
                to="/produtos"
                className="order-details-shopping-button"
              >
                <i className="bi bi-bag"></i>
                Continuar comprando
              </Link>

            </aside>

          </div>

        </div>

      </section>

    </div>
  );
}

export default PedidoDetalhes;