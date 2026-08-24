import { useMemo, useState } from "react";

import "./Relatorios.css";

function Relatorios() {
  const [period, setPeriod] = useState("30");

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

  const filteredOrders = useMemo(() => {
    const now = new Date();

    return orders.filter((order) => {
      if (!order.createdAt) return false;

      const orderDate = new Date(order.createdAt);

      const difference =
        now.getTime() - orderDate.getTime();

      const days =
        difference / (1000 * 60 * 60 * 24);

      return days >= 0 && days <= Number(period);
    });
  }, [orders, period]);

  const totalOrders = filteredOrders.length;

  const totalRevenue = filteredOrders.reduce(
    (total, order) => {
      return total + Number(order.subtotal || 0);
    },
    0
  );

  const averageTicket =
    totalOrders > 0
      ? totalRevenue / totalOrders
      : 0;

  function formatCurrency(value) {
    return `R$ ${Number(value || 0)
      .toFixed(2)
      .replace(".", ",")}`;
  }

  function getPeriodLabel() {
    if (period === "7") {
      return "Últimos 7 dias";
    }

    if (period === "30") {
      return "Últimos 30 dias";
    }

    if (period === "90") {
      return "Últimos 90 dias";
    }

    return "Todo o período";
  }

  /*
   * Produtos vendidos
   */
  const productCount = {};

  filteredOrders.forEach((order) => {
    if (!Array.isArray(order.items)) return;

    order.items.forEach((item) => {
      const name =
        item.name ||
        item.productName ||
        "Produto";

      const quantity =
        Number(item.quantity || 1);

      if (!productCount[name]) {
        productCount[name] = 0;
      }

      productCount[name] += quantity;
    });
  });

  const mostSoldProduct =
    Object.entries(productCount)
      .sort((a, b) => b[1] - a[1])[0];

  /*
   * Categorias
   */
  const categoryCount = {};

  filteredOrders.forEach((order) => {
    if (!Array.isArray(order.items)) return;

    order.items.forEach((item) => {
      const category =
        item.category || "Sem categoria";

      const quantity =
        Number(item.quantity || 1);

      if (!categoryCount[category]) {
        categoryCount[category] = 0;
      }

      categoryCount[category] += quantity;
    });
  });

  const mostUsedCategory =
    Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])[0];

  /*
   * Forma de pagamento
   */
  const paymentCount = {};

  filteredOrders.forEach((order) => {
    const payment =
      order.paymentMethod ||
      "Não informado";

    if (!paymentCount[payment]) {
      paymentCount[payment] = 0;
    }

    paymentCount[payment]++;
  });

  const mostUsedPayment =
    Object.entries(paymentCount)
      .sort((a, b) => b[1] - a[1])[0];

  /*
   * Forma de recebimento
   */
  const deliveryCount = {};

  filteredOrders.forEach((order) => {
    const delivery =
      order.deliveryMethod ||
      order.receivingMethod ||
      "Não informado";

    if (!deliveryCount[delivery]) {
      deliveryCount[delivery] = 0;
    }

    deliveryCount[delivery]++;
  });

  const mostUsedDelivery =
    Object.entries(deliveryCount)
      .sort((a, b) => b[1] - a[1])[0];

  const reports = [
    {
      label: "Pedidos realizados",
      value: totalOrders,
      description:
        "Pedidos registrados no período",
      icon: "bi-receipt",
    },
    {
      label: "Faturamento",
      value: formatCurrency(totalRevenue),
      description:
        "Valor movimentado no período",
      icon: "bi-currency-dollar",
    },
    {
      label: "Ticket médio",
      value: formatCurrency(averageTicket),
      description:
        "Valor médio por pedido",
      icon: "bi-graph-up",
    },
    {
      label: "Clientes ativos",
      value: users.length,
      description:
        "Clientes cadastrados",
      icon: "bi-people",
    },
  ];

  return (
    <div className="admin-reports">

      <div className="admin-page-heading">

        <div>
          <span>
            ANÁLISE DA REDE
          </span>

          <h2>
            Relatórios
          </h2>

          <p>
            Consulte indicadores sobre pedidos,
            vendas e clientes.
          </p>
        </div>

      </div>


      <div className="reports-period">

        <div>

          <span>
            PERÍODO
          </span>

          <strong>
            {getPeriodLabel()}
          </strong>

        </div>

        <select
          value={period}
          onChange={(event) =>
            setPeriod(event.target.value)
          }
        >
          <option value="7">
            Últimos 7 dias
          </option>

          <option value="30">
            Últimos 30 dias
          </option>

          <option value="90">
            Últimos 90 dias
          </option>

          <option value="99999">
            Todo o período
          </option>
        </select>

      </div>


      <div className="reports-grid">

        {reports.map((report) => (

          <div
            className="report-card"
            key={report.label}
          >

            <div className="report-icon">
              <i
                className={`bi ${report.icon}`}
              ></i>
            </div>

            <div>

              <span>
                {report.label}
              </span>

              <strong>
                {report.value}
              </strong>

              <small>
                {report.description}
              </small>

            </div>

          </div>

        ))}

      </div>


      <section className="reports-panel">

        <div className="reports-panel-heading">

          <div>

            <span>
              DESEMPENHO
            </span>

            <h3>
              Resumo operacional
            </h3>

          </div>

        </div>


        <div className="reports-summary">

          <div>

            <span>
              Produto mais vendido
            </span>

            <strong>
              {mostSoldProduct
                ? `${mostSoldProduct[0]} (${mostSoldProduct[1]} un.)`
                : "Nenhum pedido no período"}
            </strong>

          </div>


          <div>

            <span>
              Categoria mais procurada
            </span>

            <strong>
              {mostUsedCategory
                ? mostUsedCategory[0]
                : "Nenhum dado disponível"}
            </strong>

          </div>


          <div>

            <span>
              Forma de pagamento mais utilizada
            </span>

            <strong>
              {mostUsedPayment
                ? mostUsedPayment[0]
                : "Nenhum dado disponível"}
            </strong>

          </div>


          <div>

            <span>
              Forma de recebimento mais utilizada
            </span>

            <strong>
              {mostUsedDelivery
                ? mostUsedDelivery[0]
                : "Nenhum dado disponível"}
            </strong>

          </div>

        </div>

      </section>


      <section className="reports-info">

        <div className="reports-info-icon">
          <i className="bi bi-info-circle"></i>
        </div>

        <div>

          <strong>
            Dados do sistema
          </strong>

          <p>
            Os indicadores são calculados
            automaticamente a partir dos pedidos
            e clientes registrados no sistema.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Relatorios;