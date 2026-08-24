import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Perfil.css";

function Perfil() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: {
        street: user.address?.street || "",
        number: user.address?.number || "",
        neighborhood:
          user.address?.neighborhood || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipCode: user.address?.zipCode || "",
      },
    });
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleAddressChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      address: {
        ...current.address,
        [name]: value,
      },
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = updateUser({
      name: form.name,
      phone: form.phone,
      address: form.address,
    });

    if (result.success) {
      setMessage("Dados atualizados com sucesso.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setMessage(
        result.message ||
          "Não foi possível atualizar seus dados."
      );
    }
  }

  if (!user) {
    return (
      <div className="profile-empty">
        <h1>
          Usuário não encontrado
        </h1>

        <Link to="/login">
          Fazer login
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <section className="profile-header">

        <div className="profile-container">

          <span>
            MINHA CONTA
          </span>

          <h1>
            Meu perfil
          </h1>

          <p>
            Gerencie seus dados pessoais e endereço.
          </p>

        </div>

      </section>


      <section className="profile-section">

        <div className="profile-container">

          <div className="profile-layout">

            <aside className="profile-sidebar">

              <div className="profile-avatar">
                <i className="bi bi-person"></i>
              </div>

              <h2>
                {user.name}
              </h2>

              <p>
                {user.email}
              </p>


              <div className="profile-points">

                <i className="bi bi-star-fill"></i>

                <div>
                  <small>
                    PONTOS
                  </small>

                  <strong>
                    {user.points || 0}
                  </strong>
                </div>

              </div>

            </aside>


            <main>

              <form
                className="profile-card"
                onSubmit={handleSubmit}
              >

                <div className="profile-card-heading">

                  <div>
                    <small>
                      DADOS PESSOAIS
                    </small>

                    <h2>
                      Informações pessoais
                    </h2>
                  </div>

                </div>


                <div className="profile-fields">

                  <label>
                    Nome

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </label>


                  <label>
                    E-mail

                    <input
                      type="email"
                      value={form.email}
                      disabled
                    />

                    <small>
                      O e-mail não pode ser alterado.
                    </small>
                  </label>


                  <label>
                    Telefone

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(82) 99999-9999"
                    />
                  </label>

                </div>


                <div className="profile-card-heading address-heading">

                  <div>
                    <small>
                      ENDEREÇO
                    </small>

                    <h2>
                      Endereço de entrega
                    </h2>
                  </div>

                </div>


                <div className="profile-fields">

                  <label className="field-wide">
                    Rua

                    <input
                      type="text"
                      name="street"
                      value={form.address.street}
                      onChange={handleAddressChange}
                      placeholder="Nome da rua"
                    />
                  </label>


                  <label>
                    Número

                    <input
                      type="text"
                      name="number"
                      value={form.address.number}
                      onChange={handleAddressChange}
                    />
                  </label>


                  <label>
                    Bairro

                    <input
                      type="text"
                      name="neighborhood"
                      value={form.address.neighborhood}
                      onChange={handleAddressChange}
                    />
                  </label>


                  <label>
                    Cidade

                    <input
                      type="text"
                      name="city"
                      value={form.address.city}
                      onChange={handleAddressChange}
                    />
                  </label>


                  <label>
                    Estado

                    <input
                      type="text"
                      name="state"
                      maxLength="2"
                      value={form.address.state}
                      onChange={handleAddressChange}
                      placeholder="AL"
                    />
                  </label>


                  <label>
                    CEP

                    <input
                      type="text"
                      name="zipCode"
                      value={form.address.zipCode}
                      onChange={handleAddressChange}
                      placeholder="57000-000"
                    />
                  </label>

                </div>


                {message && (
                  <div className="profile-message">
                    <i className="bi bi-check-circle"></i>
                    {message}
                  </div>
                )}


                <div className="profile-actions">

                  <button
                    type="submit"
                    className="profile-save"
                  >
                    <i className="bi bi-check-lg"></i>
                    Salvar alterações
                  </button>

                </div>

              </form>

            </main>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Perfil;