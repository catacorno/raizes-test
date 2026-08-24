import { useState } from "react";

import "./Promocoes.css";

const PROMOTIONS_KEY = "siarn_promotions";

const INITIAL_PROMOTIONS = [
  {
    id: 1,
    nome: "Combo Raízes",
    descricao: "Desconto especial no combo selecionado.",
    tipo: "Desconto",
    valor: "15%",
    periodo: "01/08/2026 - 31/08/2026",
    status: "Ativa",
  },
  {
    id: 2,
    nome: "Cliente Raiz",
    descricao: "Benefício exclusivo para clientes fidelizados.",
    tipo: "Fidelidade",
    valor: "100 pontos",
    periodo: "01/08/2026 - 30/09/2026",
    status: "Ativa",
  },
  {
    id: 3,
    nome: "Quarta do Nordeste",
    descricao:
      "Condição especial para pedidos realizados às quartas.",
    tipo: "Campanha",
    valor: "10%",
    periodo: "01/08/2026 - 28/08/2026",
    status: "Pausada",
  },
];

function getSavedPromotions() {
  const saved = localStorage.getItem(PROMOTIONS_KEY);

  if (!saved) {
    localStorage.setItem(
      PROMOTIONS_KEY,
      JSON.stringify(INITIAL_PROMOTIONS)
    );

    return INITIAL_PROMOTIONS;
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(
      PROMOTIONS_KEY,
      JSON.stringify(INITIAL_PROMOTIONS)
    );

    return INITIAL_PROMOTIONS;
  }
}

function Promocoes() {
  const [promocoes, setPromocoes] = useState(
    getSavedPromotions
  );

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    tipo: "Desconto",
    valor: "",
    periodo: "",
  });

  function savePromotions(promotions) {
    localStorage.setItem(
      PROMOTIONS_KEY,
      JSON.stringify(promotions)
    );

    setPromocoes(promotions);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.nome || !formData.valor || !formData.periodo) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    const novaPromocao = {
      id: Date.now(),
      ...formData,
      status: "Ativa",
    };

    const updatedPromotions = [
      novaPromocao,
      ...promocoes,
    ];

    savePromotions(updatedPromotions);

    setFormData({
      nome: "",
      descricao: "",
      tipo: "Desconto",
      valor: "",
      periodo: "",
    });

    setShowForm(false);
  }

  function toggleStatus(id) {
    const updatedPromotions = promocoes.map(
      (promocao) =>
        promocao.id === id
          ? {
              ...promocao,
              status:
                promocao.status === "Ativa"
                  ? "Pausada"
                  : "Ativa",
            }
          : promocao
    );

    savePromotions(updatedPromotions);
  }

  return (
    <div className="admin-promocoes">

      <div className="admin-page-heading">

        <div>
          <span>
            MARKETING
          </span>

          <h2>
            Promoções
          </h2>

          <p>
            Crie e gerencie campanhas e benefícios para os clientes.
          </p>
        </div>

        <button
          type="button"
          className="promocoes-new-button"
          onClick={() => setShowForm((current) => !current)}
        >
          <i className="bi bi-plus-lg"></i>
          Nova promoção
        </button>

      </div>

      {showForm && (

        <section className="promocoes-form-card">

          <div className="promocoes-form-heading">

            <div>
              <span>
                NOVA CAMPANHA
              </span>

              <h3>
                Criar promoção
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="promocoes-close-button"
            >
              <i className="bi bi-x-lg"></i>
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="promocoes-form-grid">

              <div className="promocoes-field">

                <label htmlFor="nome">
                  Nome da promoção *
                </label>

                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex.: Combo Raízes"
                  required
                />

              </div>

              <div className="promocoes-field">

                <label htmlFor="tipo">
                  Tipo
                </label>

                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <option value="Desconto">
                    Desconto
                  </option>

                  <option value="Fidelidade">
                    Fidelidade
                  </option>

                  <option value="Campanha">
                    Campanha
                  </option>
                </select>

              </div>

              <div className="promocoes-field">

                <label htmlFor="valor">
                  Benefício *
                </label>

                <input
                  id="valor"
                  name="valor"
                  type="text"
                  value={formData.valor}
                  onChange={handleChange}
                  placeholder="Ex.: 15%"
                  required
                />

              </div>

              <div className="promocoes-field">

                <label htmlFor="periodo">
                  Período *
                </label>

                <input
                  id="periodo"
                  name="periodo"
                  type="text"
                  value={formData.periodo}
                  onChange={handleChange}
                  placeholder="Ex.: 01/08/2026 - 31/08/2026"
                  required
                />

              </div>

              <div className="promocoes-field promocoes-field-full">

                <label htmlFor="descricao">
                  Descrição
                </label>

                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Descreva a promoção..."
                  rows="3"
                />

              </div>

            </div>

            <div className="promocoes-form-actions">

              <button
                type="button"
                className="promocoes-cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="promocoes-save-button"
              >
                <i className="bi bi-check-lg"></i>
                Criar promoção
              </button>

            </div>

          </form>

        </section>

      )}

      <section className="promocoes-list-card">

        <div className="promocoes-list-heading">

          <div>
            <span>
              CAMPANHAS
            </span>

            <h3>
              Promoções cadastradas
            </h3>
          </div>

          <strong>
            {promocoes.length} campanhas
          </strong>

        </div>

        <div className="promocoes-list">

          {promocoes.map((promocao) => (

            <article
              className="promocao-item"
              key={promocao.id}
            >

              <div className="promocao-icon">
                <i className="bi bi-megaphone"></i>
              </div>

              <div className="promocao-info">

                <div className="promocao-title">

                  <h4>
                    {promocao.nome}
                  </h4>

                  <span
                    className={
                      promocao.status === "Ativa"
                        ? "promocao-status active"
                        : "promocao-status paused"
                    }
                  >
                    {promocao.status}
                  </span>

                </div>

                <p>
                  {promocao.descricao}
                </p>

                <div className="promocao-meta">

                  <span>
                    <i className="bi bi-tag"></i>
                    {promocao.tipo}
                  </span>

                  <span>
                    <i className="bi bi-gift"></i>
                    {promocao.valor}
                  </span>

                  <span>
                    <i className="bi bi-calendar"></i>
                    {promocao.periodo}
                  </span>

                </div>

              </div>

              <button
                type="button"
                className="promocao-toggle"
                onClick={() =>
                  toggleStatus(promocao.id)
                }
              >
                {promocao.status === "Ativa"
                  ? "Pausar"
                  : "Ativar"}
              </button>

            </article>

          ))}

        </div>

      </section>

      <section className="promocoes-info">

        <div className="promocoes-info-icon">
          <i className="bi bi-info-circle"></i>
        </div>

        <div>

          <strong>
            Dados do sistema
          </strong>

          <p>
            As promoções cadastradas são armazenadas
            localmente e podem ser ativadas ou pausadas
            pelo painel administrativo.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Promocoes;