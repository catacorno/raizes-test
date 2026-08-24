import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard/Dashboard";
import ProdutosAdmin from "../pages/admin/Produtos/Produtos";
import Promocoes from "../pages/admin/Promocoes/Promocoes";
import Relatorios from "../pages/admin/Relatorios/Relatorios";

import AdminRoute from "./AdminRoute";

import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import Home from "../pages/Home/Home";
import Unidade from "../pages/Unidade/Unidade";
import Produtos from "../pages/Produtos/Produtos";
import Carrinho from "../pages/Carrinho/Carrinho";
import Checkout from "../pages/Checkout/Checkout";
import PedidoConfirmado from "../pages/PedidoConfirmado/PedidoConfirmado";
import Pedidos from "../pages/Pedidos/Pedidos";
import PedidoDetalhes from "../pages/PedidoDetalhes/PedidoDetalhes";
import Perfil from "../pages/Perfil/Perfil";
import Fidelidade from "../pages/Fidelidade/Fidelidade";

import ClientLayout from "../layouts/ClientLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route element={<ClientLayout />}>

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/carrinho"
            element={<Carrinho />}
          />

          <Route
            path="/unidade"
            element={<Unidade />}
          />

          <Route
            path="/produtos"
            element={<Produtos />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/pedido-confirmado"
            element={<PedidoConfirmado />}
          />

          <Route
            path="/pedidos"
            element={<Pedidos />}
          />

          <Route
            path="/pedidos/:id"
            element={<PedidoDetalhes />}
          />

          <Route
            path="/perfil"
            element={<Perfil />}
          />

          <Route
            path="/fidelidade"
            element={<Fidelidade />}
          />

        </Route>

        <Route element={<AdminRoute />}>

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="produtos"
              element={<ProdutosAdmin />}
            />

            <Route
              path="promocoes"
              element={<Promocoes />}
            />

            <Route
              path="relatorios"
              element={<Relatorios />}
            />

          </Route>

        </Route>

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;