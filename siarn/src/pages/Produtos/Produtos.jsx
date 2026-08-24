import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { PRODUCTS } from "../../data/products";
import {
  getAllProductAvailability,
} from "../../utils/productAdmin";
import { useUnit } from "../../context/UnitContext";
import { useCart } from "../../context/CartContext";

import ProductCard from "../../components/ProductCard/ProductCard";

import "./Produtos.css";

function Produtos() {
  const { selectedUnit } = useUnit();

  const { addToCart } = useCart();

  const [searchParams] = useSearchParams();

  const initialCategory =
    searchParams.get("categoria") || "todos";

  const initialFeatured =
    searchParams.get("destaques") === "true";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [featuredOnly, setFeaturedOnly] = useState(initialFeatured);

  const availability = getAllProductAvailability();

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "alimentos", name: "Alimentos" },
    { id: "bebidas", name: "Bebidas" },
    { id: "doces", name: "Doces" },
    { id: "artesanato", name: "Artesanato" },
  ];

const products = useMemo(() => {
  return PRODUCTS.filter((product) => {

    const isAvailable =
      availability[product.id] !== undefined
        ? availability[product.id]
        : product.stock > 0;

      const belongsToUnit =
        !selectedUnit ||
        !product.unitIds ||
        product.unitIds.includes(selectedUnit.id);

      const matchesCategory =
        category === "todos" ||
        product.categoryId === category;

      const normalizedSearch =
        search.toLowerCase().trim();

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.description
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesFeatured =
        !featuredOnly ||
        product.featured === true;

        return (
        isAvailable &&
        belongsToUnit &&
        matchesCategory &&
        matchesSearch &&
        matchesFeatured
      );
    });
  }, [
    selectedUnit,
    category,
    search,
    featuredOnly,
  ]);

  function handleAdd(product) {
      addToCart(product);
  }

  return (
    <div className="products-page">

      <section className="products-header">

        <div className="products-container">

          <div>
            <span>CATÁLOGO</span>

            <h1>
              Produtos
            </h1>

            <p>
              Encontre produtos selecionados para você.
            </p>
          </div>

          {selectedUnit && (
            <Link
              to="/unidade"
              className="products-unit"
            >
              <i className="bi bi-geo-alt-fill"></i>

              <div>
                <small>COMPRANDO EM</small>

                <strong>
                  {selectedUnit.name}
                </strong>
              </div>
            </Link>
          )}

        </div>

      </section>


      <section className="products-section">

        <div className="products-container">

          <div className="products-toolbar">

            <div className="products-search">

              <i className="bi bi-search"></i>

              <input
                type="search"
                placeholder="Buscar produtos..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

            <div className="products-count">
              {products.length} produtos
            </div>

          </div>


          <div className="category-tabs">

            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  category === item.id
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setCategory(item.id);
                  setFeaturedOnly(false);
                }}
              >
                {item.name}
              </button>
            ))}

          </div>


          {featuredOnly && (
            <div className="featured-filter">

              <span>
                <i className="bi bi-star-fill"></i>
                Mais vendidos
              </span>

              <button
                type="button"
                onClick={() => setFeaturedOnly(false)}
              >
                Limpar filtro
                <i className="bi bi-x"></i>
              </button>

            </div>
          )}


          {products.length > 0 ? (

            <div className="products-grid">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAdd}
                />
              ))}

            </div>

          ) : (

            <div className="products-empty">

              <i className="bi bi-search"></i>

              <h2>
                Nenhum produto encontrado
              </h2>

              <p>
                Tente alterar sua busca ou categoria.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Produtos;

