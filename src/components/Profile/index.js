import React, { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "../../Auth0/context";
import "./styles.css";
import { updateEmail } from "../../api/serviceAPI";
import InputMask from "react-input-mask";
export default function Profile() {
  const { state } = useAuth0();

  if (state.responseAPI.message.paciente) {
    return <Paciente />;
  } else {
    return <Empresa />;
  }
}

const Paciente = () => {
  const { state } = useAuth0();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome,
      email,
      telefone,
      dtNascimento,
    };
    await updateEmail(email, data).then((res) =>
      alert("Proximo login dados serão atualizados")
    );
  };
  const handleProfile = useCallback(() => {
    console.log(state.responseAPI.message);
    setNome(state.responseAPI.message.nome);
    setEmail(state.responseAPI.message.email);
    setDtNascimento(state.responseAPI.message.dtNascimento);
    setTelefone(state.responseAPI.message.telefone);
  }, []); // eslint-disable-line
  useEffect(() => {
    handleProfile();
  }, [handleProfile]);
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
              id="telefone"
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
              required
              value={dtNascimento}
              onChange={(e) => setDtNascimento(e.target.value)}
            />
            <label htmlFor="dtNascimento" className="lbDtNasc">
              Data Nascimento
            </label>
            <span className="line"></span>
          </div>
        </div>

        <div className="inputProfileButtons">
          <button>Gravar</button>
        </div>
      </form>
    </div>
  );
};
const Empresa = () => {
  const { state } = useAuth0();
  const [nome, setNome] = useState("");
  const [password, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome,
      password,
      telefone,
    };
    await updateEmail(email, data).then(() =>
      alert("Proximo login dados serão atualizados")
    );
  };
  const handleProfile = useCallback(() => {
    setNome(state.responseAPI.message.nome);
    setEmail(state.responseAPI.message.email);
    setTelefone(state.responseAPI.message.telefone);
  }, []); // eslint-disable-line
  useEffect(() => {
    handleProfile();
  }, []); // eslint-disable-line
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
            type="password"
            id="senha"
            required
            value={password}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label htmlFor="senha">Senha </label>
          <span className="line"></span>
        </div>

        <div className="floating-label-input">
          <InputMask
            mask="(99)99999-9999"
            id="telefone"
            required
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <label htmlFor="telefone">Telefone </label>
          <span className="line"></span>
        </div>
        <div className="inputProfileButtons">
          <button>Gravar</button>
        </div>
      </form>
    </div>
  );
};
