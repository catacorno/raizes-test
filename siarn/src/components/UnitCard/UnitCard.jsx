import "./UnitCard.css";

function UnitCard({ unit, selected, onSelect }) {
  return (
    <article
      className={`unit-card ${selected ? "unit-card-selected" : ""}`}
    >
      <div className="unit-card-header">
        <div className="unit-icon">
          <i className="bi bi-shop"></i>
        </div>

        <span
          className={`unit-status ${
            unit.open ? "unit-open" : "unit-closed"
          }`}
        >
          <span></span>
          {unit.open ? "Aberta" : "Fechada"}
        </span>
      </div>

      <div className="unit-card-body">
        <h3>{unit.name}</h3>

        <p>
          <i className="bi bi-geo-alt"></i>
          {unit.address}
          <br />
          <span>{unit.city}</span>
        </p>

        <p>
          <i className="bi bi-clock"></i>
          {unit.hours}
        </p>

        <p>
          <i className="bi bi-telephone"></i>
          {unit.phone}
        </p>
      </div>

      <button
        type="button"
        disabled={!unit.open}
        onClick={() => onSelect(unit)}
      >
        {selected ? "Unidade selecionada" : "Selecionar unidade"}
      </button>
    </article>
  );
}

export default UnitCard;