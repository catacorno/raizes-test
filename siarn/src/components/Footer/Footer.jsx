import "./Footer.css";

function Footer() {
  return (
    <footer className="siarn-footer">
      <div className="siarn-footer-container">

        <div>
          <strong>Raízes</strong>

          <p>
            Produtos do Nordeste com qualidade e tradição.
          </p>
        </div>

        <div className="footer-links">
          <span>Política de Privacidade</span>
          <span>Termos de Uso</span>
          <span>Atendimento</span>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} Raízes
        </div>

      </div>
    </footer>
  );
}

export default Footer;