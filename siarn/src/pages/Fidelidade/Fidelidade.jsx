import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Fidelidade.css";

function Fidelidade() {
  const { user } = useAuth();

  const points = user?.points ?? 0;

  const nextReward = 100;
  const progress = Math.min(
    (points / nextReward) * 100,
    100
  );

  const pointsRemaining = Math.max(
    nextReward - points,
    0
  );

  return (
    <div className="loyalty-page">

      <section className="loyalty-header">
        <div className="loyalty-container">

          <span className="loyalty-eyebrow">
            PROGRAMA DE FIDELIDADE
          </span>

          <h1>
            Seus pontos,
            <br />
            seus benefícios.
          </h1>

          <p>
            Quanto mais você compra produtos da Rede
            Raízes do Nordeste, mais benefícios você recebe.
          </p>

        </div>
      </section>


      <section className="loyalty-section">
        <div className="loyalty-container">

          <div className="loyalty-grid">

            <div className="loyalty-points-card">

              <div className="loyalty-card-top">

                <div>
                  <span>
                    SEU SALDO
                  </span>

                  <h2>
                    {points}
                  </h2>

                  <p>
                    pontos acumulados
                  </p>
                </div>

                <div className="loyalty-points-icon">
                  <i className="bi bi-star-fill"></i>
                </div>

              </div>


              <div className="loyalty-progress">

                <div className="loyalty-progress-info">
                  <span>
                    Próximo benefício
                  </span>

                  <strong>
                    {nextReward} pontos
                  </strong>
                </div>

                <div className="loyalty-progress-bar">
                  <div
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p>
                  {pointsRemaining > 0
                    ? `Faltam ${pointsRemaining} pontos para atingir seu próximo benefício.`
                    : "Você atingiu a pontuação necessária para o benefício!"
                  }
                </p>

              </div>

            </div>


            <div className="loyalty-how-card">

              <span className="loyalty-card-label">
                COMO FUNCIONA
              </span>

              <h2>
                É simples acumular.
              </h2>

              <div className="loyalty-steps">

                <div className="loyalty-step">

                  <span>
                    01
                  </span>

                  <div>
                    <strong>
                      Faça suas compras
                    </strong>

                    <p>
                      Escolha seus produtos favoritos
                      no nosso catálogo.
                    </p>
                  </div>

                </div>


                <div className="loyalty-step">

                  <span>
                    02
                  </span>

                  <div>
                    <strong>
                      Acumule pontos
                    </strong>

                    <p>
                      Cada compra realizada contribui
                      para o seu saldo de pontos.
                    </p>
                  </div>

                </div>


                <div className="loyalty-step">

                  <span>
                    03
                  </span>

                  <div>
                    <strong>
                      Ganhe benefícios
                    </strong>

                    <p>
                      Alcance as metas e aproveite
                      vantagens especiais.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>


          <div className="loyalty-benefits">

            <div className="section-heading">

              <div>
                <span>
                  BENEFÍCIOS
                </span>

                <h2>
                  Quanto mais você acumula, mais ganha.
                </h2>
              </div>

            </div>


            <div className="benefits-grid">

              <div className="benefit-card">

                <div className="benefit-icon">
                  <i className="bi bi-star"></i>
                </div>

                <span>
                  100 PONTOS
                </span>

                <h3>
                  Cliente Raiz
                </h3>

                <p>
                  Receba condições especiais
                  em produtos selecionados.
                </p>

              </div>


              <div className="benefit-card">

                <div className="benefit-icon">
                  <i className="bi bi-gift"></i>
                </div>

                <span>
                  250 PONTOS
                </span>

                <h3>
                  Cliente Especial
                </h3>

                <p>
                  Tenha acesso a promoções e
                  benefícios exclusivos.
                </p>

              </div>


              <div className="benefit-card">

                <div className="benefit-icon">
                  <i className="bi bi-trophy"></i>
                </div>

                <span>
                  500 PONTOS
                </span>

                <h3>
                  Cliente Raízes
                </h3>

                <p>
                  Aproveite as melhores vantagens
                  do programa de fidelidade.
                </p>

              </div>

            </div>

          </div>


          <div className="loyalty-actions">

            <Link
              to="/produtos"
              className="loyalty-primary-button"
            >
              <i className="bi bi-bag"></i>
              Continuar comprando
            </Link>

            <Link
              to="/pedidos"
              className="loyalty-secondary-button"
            >
              Ver meus pedidos
              <i className="bi bi-arrow-right"></i>
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Fidelidade;