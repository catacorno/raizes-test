import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Home.css";

const PROMOTIONS_KEY = "siarn_promotions";

function Home() {
  const { user } = useAuth();

  const [promocoes] = useState(() => {
    const saved = localStorage.getItem(PROMOTIONS_KEY);

    if (!saved) {
      return [];
    }

    try {
      const promotions = JSON.parse(saved);

      return promotions.filter(
        (promocao) => promocao.status === "Ativa"
      );
    } catch {
      return [];
    }
  });

  return (
    <div className="home-page">

      <section className="home-hero">
        <div className="home-container">

          <div className="home-hero-content">

            <span className="home-eyebrow">
              SABORES DO NORDESTE
            </span>

            <h1>
              Olá, {user?.name?.split(" ")[0] || "Cliente"}!
              <br />
              O que vamos preparar hoje?
            </h1>

            <p>
              Encontre produtos selecionados, promoções especiais
              e tudo que você precisa em um só lugar.
            </p>

            <Link
              to="/unidade"
              className="home-primary-button"
            >
              <i className="bi bi-shop"></i>
              Escolher unidade
            </Link>

          </div>

          <div className="home-hero-decoration">
            🌵
          </div>

        </div>
      </section>


      <section className="home-section">
        <div className="home-container">

          <div className="section-heading">

            <div>
              <span>ENCONTRE O QUE PRECISA</span>

              <h2>
                Explore nossas categorias
              </h2>
            </div>

            <Link to="/produtos">
              Ver tudo
              <i className="bi bi-arrow-right"></i>
            </Link>

          </div>


          <div className="categories-grid">

            <Link
              to="/produtos?categoria=alimentos"
              className="category-card"
            >
              <span>🌽</span>

              <strong>
                Alimentos
              </strong>

              <small>
                Produtos regionais
              </small>
            </Link>


            <Link
              to="/produtos?categoria=bebidas"
              className="category-card"
            >
              <span>🥤</span>

              <strong>
                Bebidas
              </strong>

              <small>
                Sabores naturais
              </small>
            </Link>


            <Link
              to="/produtos?categoria=artesanato"
              className="category-card"
            >
              <span>🧺</span>

              <strong>
                Artesanato
              </strong>

              <small>
                Feito à mão
              </small>
            </Link>


            <Link
              to="/produtos?destaques=true"
              className="category-card"
            >
              <span>⭐</span>

              <strong>
                Mais vendidos
              </strong>

              <small>
                Favoritos dos clientes
              </small>
            </Link>

          </div>

        </div>
      </section>


      {promocoes.length > 0 && (

        <section className="home-promotions-section">

          <div className="home-container">

            <div className="section-heading">

              <div>
                <span>OFERTAS ESPECIAIS</span>

                <h2>
                  Promoções para você
                </h2>
              </div>

            </div>


            <div className="home-promotions-grid">

              {promocoes.map((promocao) => (

                <article
                  className="home-promotion-card"
                  key={promocao.id}
                >

                  <div className="home-promotion-icon">
                    <i className="bi bi-megaphone"></i>
                  </div>


                  <div className="home-promotion-content">

                    <span className="home-promotion-type">
                      {promocao.tipo}
                    </span>

                    <h3>
                      {promocao.nome}
                    </h3>

                    <p>
                      {promocao.descricao}
                    </p>


                    <div className="home-promotion-benefit">

                      <i className="bi bi-gift"></i>

                      <strong>
                        {promocao.valor}
                      </strong>

                    </div>


                    <small>
                      <i className="bi bi-calendar"></i>
                      {promocao.periodo}
                    </small>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>

      )}


      <section className="home-promo">
        <div className="home-container">

          <div>

            <span className="promo-label">
              PROGRAMA DE FIDELIDADE
            </span>

            <h2>
              Compre, acumule pontos
              <br />
              e ganhe benefícios.
            </h2>

            <p>
              Você já possui{" "}
              <strong>
                {user?.points ?? 0} pontos
              </strong>.
            </p>

          </div>


          <Link
            to="/fidelidade"
            className="promo-button"
          >
            Conhecer programa
          </Link>

        </div>
      </section>

    </div>
  );
}

export default Home;