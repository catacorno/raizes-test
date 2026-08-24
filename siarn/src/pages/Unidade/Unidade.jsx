import { useNavigate } from "react-router-dom";

import { useUnit } from "../../context/UnitContext";

import UnitCard from "../../components/UnitCard/UnitCard";

import "./Unidade.css";

function Unidade() {
  const navigate = useNavigate();

  const {
    units,
    selectedUnit,
    selectUnit,
  } = useUnit();

  function handleSelect(unit) {
    selectUnit(unit);

    navigate("/home");
  }

  return (
    <div className="unit-page">

      <section className="unit-hero">
        <div className="unit-container">

          <span>ENCONTRE UMA UNIDADE</span>

          <h1>
            Onde você deseja fazer
            <br />
            suas compras?
          </h1>

          <p>
            Escolha a unidade mais conveniente para você.
            Os produtos e pedidos serão vinculados à unidade selecionada.
          </p>

        </div>
      </section>

      <section className="unit-list-section">
        <div className="unit-container">

          {selectedUnit && (
            <div className="current-unit">
              <div>
                <small>UNIDADE ATUAL</small>

                <strong>
                  <i className="bi bi-check-circle-fill"></i>
                  {selectedUnit.name}
                </strong>
              </div>

              <button
                type="button"
                onClick={() => navigate("/home")}
              >
                Continuar
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          )}

          <div className="unit-section-heading">
            <div>
              <span>NOSSAS UNIDADES</span>

              <h2>
                Escolha onde comprar
              </h2>
            </div>

            <p>
              {units.length} unidades disponíveis
            </p>
          </div>

          <div className="units-grid">
            {units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                selected={selectedUnit?.id === unit.id}
                onSelect={handleSelect}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default Unidade;