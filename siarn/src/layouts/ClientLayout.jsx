import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "./ClientLayout.css";

function ClientLayout() {
  return (
    <div className="client-layout">
      <Navbar />

      <main className="client-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default ClientLayout;