import { useState } from "react";

function CardPayment({ onPaymentChange }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [paid, setPaid] = useState(false);

  function formatCardNumber(value) {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 16);

    return numbers.replace(
      /(\d{4})(?=\d)/g,
      "$1 "
    );
  }

  function formatExpiry(value) {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (numbers.length > 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    return numbers;
  }

  function handleCardNumberChange(event) {
    setCardNumber(
      formatCardNumber(event.target.value)
    );
  }

  function handleExpiryChange(event) {
    setExpiry(
      formatExpiry(event.target.value)
    );
  }

  function handleCvvChange(event) {
    setCvv(
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 4)
    );
  }

  const cardNumberValid =
    cardNumber.replace(/\D/g, "").length === 16;

  const cardNameValid =
    cardName.trim().length >= 3;

  const expiryValid =
    expiry.length === 5;

  const cvvValid =
    cvv.length >= 3;

  const formValid =
    cardNumberValid &&
    cardNameValid &&
    expiryValid &&
    cvvValid;

  function handleSimulatePayment() {
    if (!formValid) {
      return;
    }

    setPaid(true);

    if (onPaymentChange) {
      onPaymentChange("paid");
    }
  }

  return (
    <div className="checkout-card-payment">

      <div className="checkout-card-payment-header">

        <div className="checkout-card-payment-icon">
          <i className="bi bi-credit-card"></i>
        </div>

        <div>
          <strong>
            Dados do cartão
          </strong>

          <span>
            Informe os dados do cartão para continuar.
          </span>
        </div>

      </div>


      <div className="checkout-card-form">

        <div className="checkout-field">

          <label htmlFor="card-number">
            Número do cartão
          </label>

          <div className="checkout-input-icon">

            <i className="bi bi-credit-card"></i>

            <input
              id="card-number"
              type="text"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
            />

          </div>

        </div>


        <div className="checkout-field">

          <label htmlFor="card-name">
            Nome no cartão
          </label>

          <div className="checkout-input-icon">

            <i className="bi bi-person"></i>

            <input
              id="card-name"
              type="text"
              placeholder="Nome do titular"
              value={cardName}
              onChange={(event) =>
                setCardName(event.target.value)
              }
            />

          </div>

        </div>


        <div className="checkout-card-fields-row">

          <div className="checkout-field">

            <label htmlFor="card-expiry">
              Validade
            </label>

            <input
              id="card-expiry"
              type="text"
              inputMode="numeric"
              placeholder="MM/AA"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
            />

          </div>


          <div className="checkout-field">

            <label htmlFor="card-cvv">
              CVV
            </label>

            <div className="checkout-input-icon">

              <i className="bi bi-lock"></i>

              <input
                id="card-cvv"
                type="password"
                inputMode="numeric"
                placeholder="000"
                value={cvv}
                onChange={handleCvvChange}
                maxLength={4}
              />

            </div>

          </div>

        </div>


        <div className="checkout-card-security">

          <i className="bi bi-shield-check"></i>

          <span>
            Seus dados são utilizados apenas para esta
            simulação de pagamento.
          </span>

        </div>


        {!paid ? (

          <button
            type="button"
            className="checkout-card-simulate"
            disabled={!formValid}
            onClick={handleSimulatePayment}
          >
            <i className="bi bi-check-lg"></i>
            Simular pagamento
          </button>

        ) : (

          <div className="checkout-card-paid">

            <i className="bi bi-check-circle-fill"></i>

            <span>
              Pagamento confirmado
            </span>

          </div>

        )}

      </div>

    </div>
  );
}

export default CardPayment;