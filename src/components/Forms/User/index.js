import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { getGrupos } from "../../../api/serviceAPI";
import { useEffect } from "react";
export default function NewUser({ set }) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState();
  const [grupo, setGrupo] = useState("");
  const [username, setUsername] = useState("");
  const [grupos, setGrupos] = useState([]);
  const history = useHistory("");

  const handleGetGroups = async () => {
    await getGrupos().then((response) => setGrupos(response.data.message));
  };
  const handleGravar = async (e) => {
    e.preventDefault();
    const data = {
      nome,
      grupo,
      username,
      email,
    };
    console.log(data);
    history.push("/users/");
  };

  useEffect(() => {
    handleGetGroups();
  }, []);
  return (
    <div className="userContainer">
      <form className="userForm" onSubmit={handleGravar}>
        <h2>Cadastro novo usuario</h2>
        <div className="userInputGroup user">
          <div className="floating-label-input">
            <input
              type="text"
              id="nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="nome">Nome completo</label>
            <span className="line"></span>
          </div>
        </div>
        <div className="userInputGroup username">
          <div className="floating-label-input">
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Usuario</label>
            <span className="line"></span>
          </div>
        </div>
        <div className="userInputGroup email">
          <div className="floating-label-input">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">E-mail</label>
            <span className="line"></span>
          </div>
        </div>
        <div className="userInputGroup">
          <select
            name="grupo"
            id="grupo"
            onChange={(e) => setGrupo(e.target.value)}
          >
            <option value=""> Selecione um grupo</option>
            {grupos.map((g) => (
              <option value={g._id} key={g._id}>
                {g.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="userInputGroup">
          <button type="submit">Gravar</button>
          <button type="submit" onClick={() => set(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
