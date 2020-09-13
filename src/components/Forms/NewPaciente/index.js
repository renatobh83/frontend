import React, { useState } from "react";
import { findOrCreatePatient } from "../../../api/serviceAPI";

import "./styles.css";
export default function NewPaciente({ close, paciente }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome,
      username: nome,
      email,
      telefone,
      paciente: true,
      dtNascimento,
    };

    await findOrCreatePatient(data).then((res) => {
      paciente(res.data.message);
      close(false);
    });
  };

  return (
    <div className="profilePaciente">
      <form onSubmit={handleSubmit}>
        <div className="floating-label-input">
          <input
            type="text"
            id="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label htmlFor="nome">Nome </label>
          <span className="line"></span>
        </div>

        <div className="floating-label-input">
          <input
            type="text"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">E-mail </label>
          <span className="line"></span>
        </div>
        <div className="groupFlex">
          <div className="floating-label-input">
            <input
              type="text"
              id="telefone"
              required
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <label htmlFor="telefone">Telefone </label>
            <span className="line"></span>
          </div>
          <div className="floating-label-input">
            <input
              type="text"
              id="dtNascimento"
              inputMode="numeric"
              required
              value={dtNascimento}
              onChange={(e) => setDtNascimento(e.target.value)}
            />
            <label htmlFor="dtNascimento">Data Nascimento </label>
            <span className="line"></span>
          </div>
        </div>
        <div className="inputProfileButtons">
          <button>Gravar</button>
        </div>
      </form>
    </div>
  );
}
