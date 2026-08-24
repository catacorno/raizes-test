import { useState } from "react";

function PixPayment({ amount, onPaymentChange }) {
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);

  const pixCode =
    "00020126580014BR.GOV.BCB.PIX0136siarn@raizes.com.br5204000053039865404";

  function handleCopy() {
    navigator.clipboard.writeText(pixCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function handleSimulatePayment() {
    setPaid(true);

    if (onPaymentChange) {
      onPaymentChange("paid");
    }
  }

  return (
    <div className="checkout-pix">

      <div className="checkout-pix-header">

        <div className="checkout-pix-icon">
          <i className="bi bi-qr-code"></i>
        </div>

        <div>
          <strong>
            Pagamento via PIX
          </strong>

          <span>
            Realize o pagamento para confirmar seu pedido.
          </span>
        </div>

      </div>


      <div className="checkout-pix-content">

        <div className="checkout-pix-qr">

          <div className="checkout-pix-qr-placeholder">
            <i className="bi bi-qr-code"></i>
          </div>

          <span>
            QR Code PIX
          </span>

        </div>


        <div className="checkout-pix-info">

          <div className="checkout-pix-value">

            <span>
              Valor a pagar
            </span>

            <strong>
              R$ {amount.toFixed(2).replace(".", ",")}
            </strong>

          </div>


          <label>
            Código PIX
          </label>

          <div className="checkout-pix-code">

            <span>
              {pixCode}
            </span>

            <button
              type="button"
              onClick={handleCopy}
            >
              <i
                className={
                  copied
                    ? "bi bi-check-lg"
                    : "bi bi-copy"
                }
              ></i>

              {copied
                ? "Copiado"
                : "Copiar"}
            </button>

          </div>


          {!paid ? (

            <div className="checkout-pix-status">

              <i className="bi bi-hourglass-split"></i>

              <span>
                Aguardando pagamento
              </span>

            </div>

          ) : (

            <div className="checkout-pix-status paid">

              <i className="bi bi-check-circle-fill"></i>

              <span>
                Pagamento confirmado
              </span>

            </div>

          )}


          {!paid && (

            <button
              type="button"
              className="checkout-pix-simulate"
              onClick={handleSimulatePayment}
            >
              <i className="bi bi-check-lg"></i>
              Simular pagamento PIX
            </button>

          )}

        </div>

      </div>

    </div>
  );
}

export default PixPayment;