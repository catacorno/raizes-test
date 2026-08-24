import { useEffect, useState } from "react";

import { PRODUCTS } from "../../../data/products";

import {
  getProductAvailability,
  setProductAvailability,
} from "../../../utils/productAdmin";

import { useUnit } from "../../../context/UnitContext";

import "./Produtos.css";

function Produtos() {
  const { selectedUnit, units } = useUnit();

  /*
   * Unidade administrada pelo painel.
   *
   * Ela é independente da unidade selecionada pelo cliente.
   * Inicialmente usamos a unidade selecionada no contexto
   * ou, caso não exista, a primeira unidade cadastrada.
   */
  const [adminUnitId, setAdminUnitId] = useState(
    selectedUnit?.id || units[0]?.id || null
  );

  const adminUnit =
    units.find((unit) => unit.id === adminUnitId) ||
    units[0];

  /*
   * Produtos carregados conforme a unidade administrada.
   */
  const [products, setProducts] = useState([]);

  const [categoryFilter, setCategoryFilter] =
    useState("todos");

  /*
   * Sempre que a unidade administrada mudar,
   * reconstruímos a lista de produtos usando
   * a disponibilidade específica daquela unidade.
   */
  useEffect(() => {
    if (!adminUnit?.id) {
      setProducts([]);
      return;
    }

    const productsForUnit = PRODUCTS
      .filter((product) => {
        /*
         * Se o produto já possuir unitIds,
         * respeitamos a relação produto → unidades.
         *
         * Caso ainda não possua unitIds,
         * mantemos o produto disponível para a
         * unidade durante esta fase de transição.
         */
        if (Array.isArray(product.unitIds)) {
          return product.unitIds.includes(adminUnit.id);
        }

        return true;
      })
      .map((product) => {
        const savedStatus =
          getProductAvailability(
            adminUnit.id,
            product.id
          );

        return {
          ...product,

          available:
            savedStatus !== null
              ? savedStatus
              : product.stock > 0,
        };
      });

    setProducts(productsForUnit);
  }, [adminUnit?.id]);

  const categories = [
    {
      id: "todos",
      label: "Todos",
    },
    {
      id: "alimentos",
      label: "Alimentos",
    },
    {
      id: "bebidas",
      label: "Bebidas",
    },
    {
      id: "doces",
      label: "Doces",
    },
    {
      id: "artesanato",
      label: "Artesanato",
    },
  ];

  const filteredProducts =
    categoryFilter === "todos"
      ? products
      : products.filter(
          (product) =>
            product.categoryId === categoryFilter
        );

  function handleUnitChange(event) {
    setAdminUnitId(Number(event.target.value));

    /*
     * Ao trocar de unidade, voltamos para
     * "Todos" para evitar confusão com filtros
     * aplicados na unidade anterior.
     */
    setCategoryFilter("todos");
  }

  function toggleAvailability(productId) {
    if (!adminUnit?.id) {
      return;
    }

    setProducts((current) =>
      current.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        const newAvailability =
          !product.available;

        /*
         * Persistência por:
         *
         * unidade + produto
         */
        setProductAvailability(
          adminUnit.id,
          product.id,
          newAvailability
        );

        return {
          ...product,
          available: newAvailability,
        };
      })
    );
  }

  return (
    <div className="admin-produtos">

      <div className="admin-page-heading">

        <div>
          <span>
            CARDÁPIO
          </span>

          <h2>
            Produtos
          </h2>

          <p>
            Gerencie os produtos disponíveis no
            cardápio de cada unidade.
          </p>
        </div>

      </div>


      <section className="produtos-summary">

        <div className="produtos-summary-card">

          <div className="produtos-summary-icon">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <span>
              PRODUTOS
            </span>

            <strong>
              {products.length}
            </strong>
          </div>

        </div>


        <div className="produtos-summary-card">

          <div className="produtos-summary-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>
              DISPONÍVEIS
            </span>

            <strong>
              {
                products.filter(
                  (product) =>
                    product.available
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="produtos-summary-card">

          <div className="produtos-summary-icon">
            <i className="bi bi-star"></i>
          </div>

          <div>
            <span>
              DESTAQUES
            </span>

            <strong>
              {
                products.filter(
                  (product) =>
                    product.featured
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="produtos-summary-card">

          <div className="produtos-summary-icon">
            <i className="bi bi-exclamation-circle"></i>
          </div>

          <div>
            <span>
              ESTOQUE BAIXO
            </span>

            <strong>
              {
                products.filter(
                  (product) =>
                    product.stock <= 10
                ).length
              }
            </strong>
          </div>

        </div>

      </section>


      <section className="produtos-list-card">

        <div className="produtos-list-heading">

          <div>
            <span>
              CATÁLOGO
            </span>

            <h3>
              Produtos cadastrados
            </h3>
          </div>


          <div className="produtos-unit-selector">

            <label htmlFor="admin-unit">
              Unidade
            </label>

            <select
              id="admin-unit"
              value={adminUnitId || ""}
              onChange={handleUnitChange}
            >
              {units.map((unit) => (
                <option
                  key={unit.id}
                  value={unit.id}
                >
                  {unit.name}
                </option>
              ))}
            </select>

          </div>

        </div>


        <div className="produtos-filters">

          {categories.map((category) => (

            <button
              type="button"
              key={category.id}
              className={
                categoryFilter === category.id
                  ? "produto-filter active"
                  : "produto-filter"
              }
              onClick={() =>
                setCategoryFilter(category.id)
              }
            >
              {category.label}
            </button>

          ))}

        </div>


        <div className="produtos-table-wrapper">

          <table className="produtos-table">

            <thead>

              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr key={product.id}>

                  <td>

                    <div className="produto-table-name">

                      <div className="produto-table-image">
                        {product.image}
                      </div>

                      <div>

                        <strong>
                          {product.name}
                        </strong>

                        {product.featured && (
                          <span>
                            <i className="bi bi-star-fill"></i>
                            Destaque
                          </span>
                        )}

                      </div>

                    </div>

                  </td>


                  <td>

                    <span className="produto-category">
                      {product.category}
                    </span>

                  </td>


                  <td>

                    <strong className="produto-price">
                      R${" "}
                      {product.price
                        .toFixed(2)
                        .replace(".", ",")}
                    </strong>

                  </td>


                  <td>

                    <span
                      className={
                        product.stock <= 10
                          ? "produto-stock low"
                          : "produto-stock"
                      }
                    >
                      {product.stock} un.
                    </span>

                  </td>


                  <td>

                    <span
                      className={
                        product.available
                          ? "produto-status available"
                          : "produto-status unavailable"
                      }
                    >
                      {product.available
                        ? "Disponível"
                        : "Indisponível"}
                    </span>

                  </td>


                  <td>

                    <button
                      type="button"
                      className="produto-action"
                      onClick={() =>
                        toggleAvailability(
                          product.id
                        )
                      }
                    >
                      {product.available
                        ? "Desativar"
                        : "Ativar"}
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {filteredProducts.length === 0 && (

          <div className="produtos-empty">

            <i className="bi bi-box"></i>

            <strong>
              Nenhum produto encontrado
            </strong>

            <span>
              Não existem produtos nessa categoria
              para esta unidade.
            </span>

          </div>

        )}

      </section>


      <section className="produtos-info">

        <div className="produtos-info-icon">
          <i className="bi bi-info-circle"></i>
        </div>

        <div>

          <strong>
            Dados do sistema
          </strong>

          <p>
            A disponibilidade dos produtos é
            gerenciada individualmente para cada
            unidade e permanece salva no sistema.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Produtos;