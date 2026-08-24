import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./PedidoConfirmado.css";

function PedidoConfirmado() {
  const { user } = useAuth();

  const savedOrder = localStorage.getItem("siarn_last_order");

  const order = savedOrder
    ? JSON.parse(savedOrder)
    : null;

  if (!order) {
    return (
      <div className="order-confirmation-page">

        <div className="order-confirmation-empty">

          <div className="confirmation-icon">
            <i className="bi bi-receipt"></i>
          </div>

          <h1>
            Nenhum pedido encontrado
          </h1>

          <p>
            Não encontramos um pedido recente para exibir.
          </p>

          <Link
            to="/produtos"
            className="confirmation-primary-button"
          >
            <i className="bi bi-bag"></i>
            Ver produtos
          </Link>

        </div>

      </div>
    );
  }

  const formattedTotal = order.subtotal
    .toFixed(2)
    .replace(".", ",");

  const formattedDate = new Date(
    order.createdAt
  ).toLocaleString("pt-BR");

  return (
    <div className="order-confirmation-page">

      <section className="confirmation-section">

        <div className="confirmation-container">

          <div className="confirmation-success">

            <div className="confirmation-success-icon">
              <i className="bi bi-check-lg"></i>
            </div>

            <span>
              PEDIDO REALIZADO
            </span>

            <h1>
              Pedido recebido!
            </h1>

            <p>
              Obrigado pela sua compra,{" "}
              <strong>
                {user?.name?.split(" ")[0] ||
                  order.customer ||
                  "Cliente"}
              </strong>
              .
            </p>

            <p>
              Seu pedido foi registrado com sucesso
              e já pode ser acompanhado pelo sistema.
            </p>

          </div>


          <div className="confirmation-order-card">

            <div className="confirmation-order-header">

              <div>
                <small>
                  NÚMERO DO PEDIDO
                </small>

                <strong>
                  {order.id}
                </strong>
              </div>

              <span className="confirmation-status">
                <i className="bi bi-clock"></i>
                {order.status}
              </span>

            </div>


            <div className="confirmation-order-info">

              <div>
                <small>
                  DATA
                </small>

                <strong>
                  {formattedDate}
                </strong>
              </div>


              <div>
                <small>
                  UNIDADE
                </small>

                <strong>
                  {order.unit?.name ||
                    "Unidade selecionada"}
                </strong>
              </div>


              <div>
                <small>
                  PAGAMENTO
                </small>

                <strong>
                  {order.paymentMethod === "pix"
                    ? "PIX"
                    : order.paymentMethod === "card"
                      ? "Cartão"
                      : "Dinheiro"}
                </strong>
              </div>


              <div>
                <small>
                  RECEBIMENTO
                </small>

                <strong>
                  {order.deliveryMethod === "pickup"
                    ? "Retirada na unidade"
                    : "Entrega"}
                </strong>
              </div>

            </div>


            <div className="confirmation-items">

              <h2>
                Itens do pedido
              </h2>

              {order.items.map((item) => (

                <div
                  className="confirmation-item"
                  key={item.id}
                >

                  <div className="confirmation-item-image">
                    {item.image}
                  </div>

                  <div className="confirmation-item-info">

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.quantity}x R${" "}
                      {item.price
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>

                  </div>

                  <strong>
                    R${" "}
                    {(item.price * item.quantity)
                      .toFixed(2)
                      .replace(".", ",")}
                  </strong>

                </div>

              ))}

            </div>


            <div className="confirmation-total">

              <span>
                Total do pedido
              </span>

              <strong>
                R$ {formattedTotal}
              </strong>

            </div>

          </div>


          <div className="confirmation-actions">

            <Link
              to="/pedidos"
              className="confirmation-primary-button"
            >
              <i className="bi bi-receipt"></i>
              Meus pedidos
            </Link>

            <Link
              to="/produtos"
              className="confirmation-secondary-button"
            >
              <i className="bi bi-bag"></i>
              Continuar comprando
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default PedidoConfirmado;