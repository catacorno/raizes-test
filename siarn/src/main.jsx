import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/styles/global.css";
import "./assets/styles/components.css";

import { UnitProvider } from "./context/UnitContext";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <AuthProvider>
    <UnitProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UnitProvider>
  </AuthProvider>
</React.StrictMode>
);