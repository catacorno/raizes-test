import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./AdminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <div className="admin-brand">

          <div className="admin-brand-icon">
            🌵
          </div>

          <div>
            <strong>Raízes</strong>
            <span>Painel administrativo</span>
          </div>

        </div>


        <nav className="admin-navigation">

          <span className="admin-navigation-label">
            PRINCIPAL
          </span>

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <i className="bi bi-grid"></i>
            Dashboard
          </NavLink>


          <NavLink
            to="/admin/produtos"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <i className="bi bi-box-seam"></i>
            Produtos
          </NavLink>


          <NavLink
            to="/admin/promocoes"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <i className="bi bi-megaphone"></i>
            Promoções
          </NavLink>


          <NavLink
            to="/admin/relatorios"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            <i className="bi bi-bar-chart"></i>
            Relatórios
          </NavLink>

        </nav>


        <div className="admin-sidebar-bottom">

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-left"></i>
            Sair
          </button>

        </div>

      </aside>


      <div className="admin-main">

        <header className="admin-header">

          <div>

            <span>
              PAINEL ADMINISTRATIVO
            </span>

            <h1>
              Rede Raízes do Nordeste
            </h1>

          </div>


          <div className="admin-user">

            <div className="admin-user-icon">
              <i className="bi bi-person"></i>
            </div>

            <div>
              <strong>
                {user?.name?.split(" ")[0] || "Administrador"}
              </strong>

              <span>
                Administrador
              </span>
            </div>

          </div>

        </header>


        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;