import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!privacyAccepted) {
      setError(
        "É necessário aceitar a Política de Privacidade para criar sua conta."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login", {
      state: {
        message: "Conta criada com sucesso! Agora faça seu login.",
      },
    });
  }

  return (
    <main className="register-page">
      <section className="register-card">

        <div className="register-brand">
          <span className="register-brand-mark">🌵</span>

          <h1>Raízes</h1>

          <p>Do Nordeste para sua mesa</p>
        </div>

        <div className="register-content">

          <h2>Crie sua conta</h2>

          <p className="register-description">
            Cadastre-se para fazer pedidos e participar do nosso
            programa de fidelidade.
          </p>

          {error && (
            <div className="register-error">
              <i className="bi bi-exclamation-circle"></i>

              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="register-field">
              <label htmlFor="name">
                Nome completo
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="password">
                Senha
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Crie uma senha"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="confirmPassword">
                Confirmar senha
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Digite a senha novamente"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>

            <div className="privacy-notice">

              <i className="bi bi-shield-check"></i>

              <div>

                <strong>
                  Privacidade e proteção dos seus dados
                </strong>

                <p>
                  O Sistema utiliza seus dados cadastrais para
                  identificação e autenticação da conta,
                  realização e acompanhamento de pedidos e
                  funcionamento do programa de fidelidade.
                  Os dados são utilizados para as finalidades
                  informadas durante o cadastro.
                </p>

                <label
                  className="privacy-checkbox"
                  htmlFor="privacyAccepted"
                >
                  <input
                    id="privacyAccepted"
                    name="privacyAccepted"
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(event) =>
                      setPrivacyAccepted(event.target.checked)
                    }
                  />

                  <span>
                    Li e concordo com o tratamento dos meus
                    dados para as finalidades informadas.
                  </span>
                </label>

              </div>

            </div>

            <button
              type="submit"
              className="register-submit"
              disabled={!privacyAccepted}
            >
              Criar minha conta
            </button>

          </form>

          <p className="already-account">
            Já possui uma conta?
          </p>

          <Link
            to="/login"
            className="back-login"
          >
            Voltar para o login
          </Link>

        </div>

      </section>
    </main>
  );
}

export default Cadastro;