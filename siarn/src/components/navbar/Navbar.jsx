import { NavLink, Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useUnit } from "../../context/UnitContext";
import { useCart } from "../../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const { user, logout } = useAuth();
  const { selectedUnit } = useUnit();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="siarn-navbar">
      <div className="siarn-navbar-container">

        <Link
          to="/home"
          className="siarn-logo"
        >
          <span className="siarn-logo-icon">
            🌵
          </span>

          <div>
            <strong>
              Raízes
            </strong>

            <small>
              Do Nordeste para sua mesa
            </small>
          </div>
        </Link>


        <nav className="siarn-nav-links">

          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <i className="bi bi-house"></i>
            Início
          </NavLink>


          <NavLink
            to="/unidade"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <i className="bi bi-geo-alt"></i>
            Unidade
          </NavLink>


          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <i className="bi bi-bag"></i>
            Produtos
          </NavLink>


          <NavLink
            to="/pedidos"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <i className="bi bi-receipt"></i>
            Meus pedidos
          </NavLink>

        </nav>


        <div className="siarn-navbar-actions">

          {selectedUnit && (
            <Link
              to="/unidade"
              className="navbar-unit"
            >
              <i className="bi bi-geo-alt-fill"></i>

              <span>
                {selectedUnit.name}
              </span>
            </Link>
          )}


          <Link
            to="/carrinho"
            className="navbar-icon-button"
            aria-label="Carrinho"
          >
            <i className="bi bi-cart3"></i>

            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems}
              </span>
            )}
          </Link>


          <Link
            to="/perfil"
            className="navbar-user"
          >
            <span className="navbar-user-icon">
              <i className="bi bi-person"></i>
            </span>

            <span className="navbar-user-name">
              {user?.name?.split(" ")[0] || "Cliente"}
            </span>
          </Link>


          <button
            type="button"
            className="navbar-logout"
            onClick={handleLogout}
            title="Sair"
          >
            <i className="bi bi-box-arrow-right"></i>
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;