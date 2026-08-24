import { createContext, useContext, useState } from "react";

const UnitContext = createContext(null);

const UNITS = [
  {
    id: 1,
    name: "Unidade Centro",
    address: "Rua Principal, 100 - Centro",
    city: "Maceió - AL",
    hours: "08:00 às 18:00",
    phone: "(82) 3333-0001",
    open: true,
  },
  {
    id: 2,
    name: "Unidade Shopping",
    address: "Av. Central, 500 - Shopping",
    city: "Maceió - AL",
    hours: "10:00 às 22:00",
    phone: "(82) 3333-0002",
    open: true,
  },
  {
    id: 3,
    name: "Unidade Bairro",
    address: "Rua das Palmeiras, 250 - Farol",
    city: "Maceió - AL",
    hours: "08:00 às 17:00",
    phone: "(82) 3333-0003",
    open: false,
  },
];

export function UnitProvider({ children }) {
  const [selectedUnit, setSelectedUnit] = useState(() => {
    const saved = localStorage.getItem("siarn_selected_unit");

    return saved ? JSON.parse(saved) : null;
  });

  function selectUnit(unit) {
    setSelectedUnit(unit);
    localStorage.setItem(
      "siarn_selected_unit",
      JSON.stringify(unit)
    );
  }

  function clearUnit() {
    setSelectedUnit(null);
    localStorage.removeItem("siarn_selected_unit");
  }

  return (
    <UnitContext.Provider
      value={{
        units: UNITS,
        selectedUnit,
        selectUnit,
        clearUnit,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  return useContext(UnitContext);
}