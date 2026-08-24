import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const successMessage = location.state?.message;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/home", { replace: true });
  }

  return (
    <main className="login-page">

      <section className="login-card">

        <div className="login-brand">

          <span className="login-brand-mark">
            🌵
          </span>

          <h1>Raízes</h1>

          <p>Do Nordeste para sua mesa</p>

        </div>

        <div className="login-content">

          <h2>Bem-vindo de volta!</h2>

          <p className="login-description">
            Entre na sua conta para fazer seu pedido.
          </p>

          {successMessage && (
            <div className="login-success">
              <i className="bi bi-check-circle"></i>

              {successMessage}
            </div>
          )}

          {error && (
            <div className="login-error">
              <i className="bi bi-exclamation-circle"></i>

              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="login-field">

              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

            </div>

            <div className="login-field">

              <label htmlFor="password">
                Senha
              </label>

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />

            </div>

            <button type="submit">
              Entrar
            </button>

          </form>

          <button
            type="button"
            className="forgot-password"
          >
            Esqueci minha senha
          </button>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <p className="register-text">
            Ainda não possui uma conta?
          </p>

          <Link
            to="/cadastro"
            className="register-button"
          >
            Criar minha conta
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Login;