import React, { useEffect, useState } from "react";
import { findOrCreatePatient, updateEmail } from "../../../api/serviceAPI";

import "./styles.css";
import InputMask from "react-input-mask";
export default function NewPaciente({ close, setNewPaciente, paciente }) {
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

    if (paciente) {
      await updateEmail(paciente.email, data).then((res) => {
        setNewPaciente(res.data.message);
        close(false);
      });
    } else {
      await findOrCreatePatient(data).then((res) => {
        setNewPaciente(res.data.message);
        close(false);
      });
    }
  };
  const handleEditPaciente = (e) => {
    if (e !== null) {
      setNome(e.nome);
      setTelefone(e.telefone);
      setEmail(e.email);
      setDtNascimento(e.dtNascimento);
    }
  };
  useEffect(() => {
    handleEditPaciente(paciente);
  }, [paciente]);
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
            <InputMask
              mask="(99)99999-9999"
              type="text"
              id="telefone"
              inputMode="numeric"
              required
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <label htmlFor="telefone">Telefone </label>
            <span className="line"></span>
          </div>
          <div className="floating-label-input">
            <InputMask
              mask="99/99/9999"
              type="text"
              id="dtNascimento"
              inputMode="numeric"
              required
              value={dtNascimento}
              onChange={(e) => setDtNascimento(e.target.value)}
            />
            <label htmlFor="dtNascimento" className="lbDtNasc">
              Data Nascimento{" "}
            </label>
            <span className="line"></span>
          </div>
        </div>
        <div className="inputProfileButtons">
          <button>Gravar</button>
          <button onClick={() => close()}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
