import { Link } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const savedOrders =
    localStorage.getItem("siarn_orders");

  const orders = savedOrders
    ? JSON.parse(savedOrders)
    : [];

  const savedUsers =
    localStorage.getItem("siarn_users");

  const users = savedUsers
    ? JSON.parse(savedUsers)
    : [];

  // Data atual
  const today = new Date();

  // Pedidos realizados hoje
  const ordersToday = orders.filter((order) => {
    if (!order.createdAt) return false;

    const orderDate = new Date(order.createdAt);

    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  });

  // Faturamento do dia
  const revenueToday = ordersToday.reduce(
    (total, order) => {
      return total + Number(order.subtotal || 0);
    },
    0
  );

  const formattedRevenue = revenueToday
    .toFixed(2)
    .replace(".", ",");

  const stats = [
    {
      label: "Pedidos hoje",
      value: ordersToday.length,
      icon: "bi-receipt",
      description: "Pedidos registrados hoje",
    },
    {
      label: "Faturamento",
      value: `R$ ${formattedRevenue}`,
      icon: "bi-currency-dollar",
      description: "Movimentação do dia",
    },
    {
      label: "Clientes",
      value: users.length,
      icon: "bi-people",
      description: "Clientes cadastrados",
    },
    {
      label: "Promoções ativas",
      value: "4",
      icon: "bi-megaphone",
      description: "Campanhas em andamento",
    },
  ];

  // Pedidos mais recentes
  const recentOrders = orders.slice(0, 4);

  function formatCurrency(value) {
    return `R$ ${Number(value || 0)
      .toFixed(2)
      .replace(".", ",")}`;
  }

  function formatStatus(status) {
    return status || "Recebido";
  }

  function getStatusClass(status) {
    return (status || "Recebido")
      .toLowerCase()
      .replaceAll(" ", "-");
  }

  return (
    <div className="admin-dashboard">

      <div className="admin-page-heading">

        <div>
          <span>
            VISÃO GERAL
          </span>

          <h2>
            Dashboard
          </h2>

          <p>
            Acompanhe os principais indicadores da rede.
          </p>
        </div>

      </div>


      <div className="dashboard-stats">

        {stats.map((stat) => (

          <div
            className="dashboard-stat-card"
            key={stat.label}
          >

            <div className="dashboard-stat-icon">
              <i className={`bi ${stat.icon}`}></i>
            </div>

            <div className="dashboard-stat-content">

              <span>
                {stat.label}
              </span>

              <strong>
                {stat.value}
              </strong>

              <small>
                {stat.description}
              </small>

            </div>

          </div>

        ))}

      </div>


      <div className="dashboard-grid">

        <section className="dashboard-card">

          <div className="dashboard-card-heading">

            <div>
              <span>
                OPERAÇÃO
              </span>

              <h3>
                Pedidos recentes
              </h3>
            </div>

            <Link to="/pedidos">
              Ver pedidos
            </Link>

          </div>


          <div className="dashboard-orders">

            {recentOrders.length > 0 ? (

              recentOrders.map((order) => (

                <div
                  className="dashboard-order"
                  key={order.id}
                >

                  <div className="dashboard-order-icon">
                    <i className="bi bi-receipt"></i>
                  </div>

                  <div className="dashboard-order-info">

                    <strong>
                      {order.id}
                    </strong>

                    <span>
                      {order.customer || "Cliente"}
                    </span>

                  </div>

                  <div className="dashboard-order-value">

                    <strong>
                      {formatCurrency(order.subtotal)}
                    </strong>

                    <span
                      className={
                        `dashboard-order-status ${getStatusClass(
                          order.status
                        )}`
                      }
                    >
                      {formatStatus(order.status)}
                    </span>

                  </div>

                </div>

              ))

            ) : (

              <div className="dashboard-empty">

                <i className="bi bi-receipt"></i>

                <span>
                  Nenhum pedido realizado ainda.
                </span>

              </div>

            )}

          </div>

        </section>


        <section className="dashboard-card dashboard-shortcuts">

          <div className="dashboard-card-heading">

            <div>
              <span>
                ACESSO RÁPIDO
              </span>

              <h3>
                Gestão
              </h3>
            </div>

          </div>


          <div className="dashboard-shortcut-list">

            <Link
              to="/admin/promocoes"
              className="dashboard-shortcut"
            >

              <div className="dashboard-shortcut-icon">
                <i className="bi bi-megaphone"></i>
              </div>

              <div>
                <strong>
                  Promoções
                </strong>

                <span>
                  Criar e gerenciar campanhas
                </span>
              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>


            <Link
              to="/admin/produtos"
              className="dashboard-shortcut"
            >

              <div className="dashboard-shortcut-icon">
                <i className="bi bi-box-seam"></i>
              </div>

              <div>
                <strong>
                  Produtos
                </strong>

                <span>
                  Gerenciar o cardápio
                </span>
              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>


            <Link
              to="/admin/relatorios"
              className="dashboard-shortcut"
            >

              <div className="dashboard-shortcut-icon">
                <i className="bi bi-bar-chart"></i>
              </div>

              <div>
                <strong>
                  Relatórios
                </strong>

                <span>
                  Consultar indicadores
                </span>
              </div>

              <i className="bi bi-chevron-right"></i>

            </Link>

          </div>

        </section>

      </div>


      <section className="dashboard-info">

        <div className="dashboard-info-icon">
          <i className="bi bi-info-circle"></i>
        </div>

        <div>

          <strong>
            Dados do sistema
          </strong>

          <p>
            Os indicadores de pedidos, faturamento e clientes
            são calculados automaticamente a partir dos dados
            registrados no sistema.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;