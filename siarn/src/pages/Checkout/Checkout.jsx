import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useUnit } from "../../context/UnitContext";
import { addUserPoints } from "../../services/auth";

import "./Checkout.css";

import PixPayment from "./components/PixPayment";
import CardPayment from "./components/CardPayment";

function Checkout() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const { selectedUnit } = useUnit();

  const [deliveryMethod, setDeliveryMethod] =
    useState("pickup");

  const [paymentMethod, setPaymentMethod] =
    useState("pix");

  const [paymentStatus, setPaymentStatus] =
    useState("pending");

  const [loading, setLoading] =
    useState(false);

  const formattedSubtotal = subtotal
    .toFixed(2)
    .replace(".", ",");

  // R$ 1,00 gasto = 1 ponto
  const earnedPoints = Math.floor(subtotal);

  const hasAddress =
    Boolean(
      user?.address?.street &&
      user?.address?.number &&
      user?.address?.neighborhood &&
      user?.address?.city &&
      user?.address?.state &&
      user?.address?.zipCode
    );

  function handleDeliveryChange(method) {
    setDeliveryMethod(method);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      paymentMethod !== "cash" &&
      paymentStatus !== "paid"
    ) {
      alert(
        "Conclua o pagamento antes de finalizar o pedido."
      );

      return;
    }

    if (!selectedUnit) {
      alert(
        "Selecione uma unidade antes de finalizar."
      );

      navigate("/unidade");
      return;
    }

    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio.");

      navigate("/produtos");
      return;
    }

    if (
      deliveryMethod === "delivery" &&
      !hasAddress
    ) {
      alert(
        "Cadastre seu endereço no perfil antes de escolher a entrega em casa."
      );

      navigate("/perfil");
      return;
    }

    setLoading(true);

    const order = {
      id: `PED-${Date.now()}`,

      customer:
        user?.name || "Cliente",

      customerId:
        user?.id || null,

      unit: selectedUnit,

      items: cartItems,

      subtotal,

      earnedPoints,

      deliveryMethod,

      deliveryAddress:
        deliveryMethod === "delivery"
          ? user.address
          : null,

      paymentMethod,

      paymentStatus:
        paymentMethod === "cash"
          ? "pending"
          : paymentStatus,

      status: "Recebido",

      createdAt:
        new Date().toISOString(),
    };

    const savedOrders =
      localStorage.getItem("siarn_orders");

    const orders = savedOrders
      ? JSON.parse(savedOrders)
      : [];

    orders.unshift(order);

    localStorage.setItem(
      "siarn_orders",
      JSON.stringify(orders)
    );

    if (
      user?.id &&
      earnedPoints > 0
    ) {
      addUserPoints(
        user.id,
        earnedPoints
      );
    }

    localStorage.setItem(
      "siarn_last_order",
      JSON.stringify(order)
    );

    setTimeout(() => {
      clearCart();
      navigate("/pedido-confirmado");
    }, 700);
  }

  return (
    <div className="checkout-page">

      <section className="checkout-header">

        <div className="checkout-container">

          <span>
            FINALIZAÇÃO
          </span>

          <h1>
            Finalizar pedido
          </h1>

          <p>
            Confira seus dados e escolha como receber seu pedido.
          </p>

        </div>

      </section>


      <section className="checkout-section">

        <div className="checkout-container">

          <form
            className="checkout-layout"
            onSubmit={handleSubmit}
          >

            <div className="checkout-main">


              <div className="checkout-card">

                <div className="checkout-card-heading">

                  <div className="checkout-number">
                    1
                  </div>

                  <div>

                    <h2>
                      Unidade
                    </h2>

                    <p>
                      Onde seu pedido será preparado
                    </p>

                  </div>

                </div>


                {selectedUnit ? (

                  <div className="checkout-unit">

                    <i className="bi bi-shop"></i>

                    <div>

                      <strong>
                        {selectedUnit.name}
                      </strong>

                      <span>
                        {selectedUnit.address}
                      </span>

                      <span>
                        {selectedUnit.city}
                      </span>

                    </div>

                    <Link to="/unidade">
                      Alterar
                    </Link>

                  </div>

                ) : (

                  <Link
                    to="/unidade"
                    className="checkout-select-unit"
                  >
                    <i className="bi bi-geo-alt"></i>
                    Selecionar unidade
                  </Link>

                )}

              </div>

              <div className="checkout-card">

                <div className="checkout-card-heading">

                  <div className="checkout-number">
                    2
                  </div>

                  <div>

                    <h2>
                      Recebimento
                    </h2>

                    <p>
                      Escolha como deseja receber
                    </p>

                  </div>

                </div>


                <div className="checkout-options">

                  <label
                    className={
                      deliveryMethod === "pickup"
                        ? "checkout-option active"
                        : "checkout-option"
                    }
                  >

                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={
                        deliveryMethod === "pickup"
                      }
                      onChange={() =>
                        handleDeliveryChange(
                          "pickup"
                        )
                      }
                    />

                    <i className="bi bi-shop"></i>

                    <div>

                      <strong>
                        Retirar na unidade
                      </strong>

                      <span>
                        Retire seu pedido diretamente na unidade.
                      </span>

                    </div>

                  </label>


                  <label
                    className={
                      deliveryMethod === "delivery"
                        ? "checkout-option active"
                        : "checkout-option"
                    }
                  >

                    <input
                      type="radio"
                      name="delivery"
                      value="delivery"
                      checked={
                        deliveryMethod === "delivery"
                      }
                      onChange={() =>
                        handleDeliveryChange(
                          "delivery"
                        )
                      }
                    />

                    <i className="bi bi-truck"></i>

                    <div>

                      <strong>
                        Receber em casa
                      </strong>

                      <span>
                        Entrega no endereço cadastrado.
                      </span>

                    </div>

                  </label>

                </div>


                {/* ENDEREÇO DE ENTREGA */}

                {deliveryMethod === "delivery" && (

                  <div className="checkout-address">

                    {hasAddress ? (

                      <>

                        <div className="checkout-address-heading">

                          <i className="bi bi-geo-alt-fill"></i>

                          <div>

                            <strong>
                              Endereço de entrega
                            </strong>

                            <span>
                              Endereço cadastrado no seu perfil
                            </span>

                          </div>

                        </div>


                        <div className="checkout-address-content">

                          <strong>
                            {user.address.street},{" "}
                            {user.address.number}
                          </strong>

                          <span>
                            {user.address.neighborhood}
                          </span>

                          <span>
                            {user.address.city} -{" "}
                            {user.address.state}
                          </span>

                          <span>
                            CEP: {user.address.zipCode}
                          </span>

                        </div>


                        <Link
                          to="/perfil"
                          className="checkout-address-edit"
                        >
                          <i className="bi bi-pencil"></i>
                          Alterar endereço
                        </Link>

                      </>

                    ) : (

                      <div className="checkout-address-empty">

                        <i className="bi bi-exclamation-circle"></i>

                        <div>

                          <strong>
                            Endereço não cadastrado
                          </strong>

                          <span>
                            Para receber seu pedido em casa,
                            cadastre seu endereço no seu perfil.
                          </span>

                        </div>

                        <Link to="/perfil">
                          Cadastrar endereço
                        </Link>

                      </div>

                    )}

                  </div>

                )}

              </div>

              <div className="checkout-card">

                <div className="checkout-card-heading">

                  <div className="checkout-number">
                    3
                  </div>

                  <div>

                    <h2>
                      Pagamento
                    </h2>

                    <p>
                      Escolha a forma de pagamento
                    </p>

                  </div>

                </div>


                {/* FORMAS DE PAGAMENTO */}

                <div className="checkout-options">

                  {/* PIX */}

                  <label
                    className={
                      paymentMethod === "pix"
                        ? "checkout-option active"
                        : "checkout-option"
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="pix"
                      checked={
                        paymentMethod === "pix"
                      }
                      onChange={(event) => {
                        setPaymentMethod(
                          event.target.value
                        );

                        setPaymentStatus(
                          "pending"
                        );
                      }}
                    />

                    <i className="bi bi-qr-code"></i>

                    <div>

                      <strong>
                        PIX
                      </strong>

                      <span>
                        Pagamento instantâneo.
                      </span>

                    </div>

                  </label>


                  {/* CARTÃO */}

                  <label
                    className={
                      paymentMethod === "card"
                        ? "checkout-option active"
                        : "checkout-option"
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={
                        paymentMethod === "card"
                      }
                      onChange={(event) => {
                        setPaymentMethod(
                          event.target.value
                        );

                        setPaymentStatus(
                          "pending"
                        );
                      }}
                    />

                    <i className="bi bi-credit-card"></i>

                    <div>

                      <strong>
                        Cartão
                      </strong>

                      <span>
                        Pagamento com cartão.
                      </span>

                    </div>

                  </label>


                  {/* DINHEIRO */}

                  <label
                    className={
                      paymentMethod === "cash"
                        ? "checkout-option active"
                        : "checkout-option"
                    }
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={
                        paymentMethod === "cash"
                      }
                      onChange={(event) => {
                        setPaymentMethod(
                          event.target.value
                        );

                        setPaymentStatus(
                          "pending"
                        );
                      }}
                    />

                    <i className="bi bi-cash-stack"></i>

                    <div>

                      <strong>
                        Dinheiro
                      </strong>

                      <span>
                        Pagamento no recebimento.
                      </span>

                    </div>

                  </label>

                </div>

                {paymentMethod === "pix" && (

                  <PixPayment
                    amount={subtotal}
                    onPaymentChange={
                      setPaymentStatus
                    }
                  />

                )}


                {paymentMethod === "card" && (

                  <CardPayment
                    onPaymentChange={
                      setPaymentStatus
                    }
                  />

                )}


                {paymentMethod === "cash" && (

                  <div className="checkout-cash-payment">

                    <div className="checkout-cash-payment-icon">

                      <i className="bi bi-cash-stack"></i>

                    </div>

                    <div>

                      <strong>
                        Pagamento em dinheiro
                      </strong>

                      <span>
                        O pagamento será realizado no momento
                        da retirada ou entrega do pedido.
                      </span>

                    </div>

                  </div>

                )}

              </div>

            </div>

            <aside className="checkout-summary">

              <h2>
                Resumo
              </h2>


              <div className="checkout-summary-items">

                {cartItems.map((item) => (

                  <div
                    className="checkout-summary-item"
                    key={item.id}
                  >

                    <div className="checkout-summary-image">
                      {item.image}
                    </div>

                    <div>

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


              <div className="checkout-total">

                <span>
                  Total
                </span>

                <strong>
                  R$ {formattedSubtotal}
                </strong>

              </div>


              {/* PONTOS */}

              <div className="checkout-points">

                <i className="bi bi-star-fill"></i>

                <span>
                  Você ganhará{" "}
                  <strong>
                    {earnedPoints} pontos
                  </strong>{" "}
                  nesta compra.
                </span>

              </div>


              <button
                type="submit"
                className="checkout-submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <i className="bi bi-hourglass-split"></i>
                    Processando...
                  </>
                ) : (
                  <>
                    Finalizar pedido
                    <i className="bi bi-check-lg"></i>
                  </>
                )}

              </button>


              <Link
                to="/carrinho"
                className="checkout-back"
              >
                <i className="bi bi-arrow-left"></i>
                Voltar ao carrinho
              </Link>

            </aside>

          </form>

        </div>

      </section>

    </div>
  );
}

export default Checkout;