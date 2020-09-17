import React, { useState, useEffect, useCallback } from "react";

import "./styles.css";
import {
  getGruposUsers,
  createOrUpdate,
  updateEmail,
} from "../../../api/serviceAPI";

export default function NewUser({ set, u }) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [grupo, setGrupo] = useState("");
  const [username, setUsername] = useState("");
  const [userAtivo, setAtivo] = useState(true);
  const [grupos, setGrupos] = useState([]);
  // const [grupoidEdit, setGrupoEdit] = useState(null);

  const handleGravar = async (e) => {
    e.preventDefault();
    let data;
    if (senha) {
      data = {
        name: nome,
        grupoId: grupo,
        nickname: username,
        email,
        password: senha,
        ativo: userAtivo,
      };
    } else {
      data = {
        name: nome,
        grupoId: grupo,
        nickname: username,
        email,
        ativo: userAtivo,
      };
    }

    if (u.email !== email && u.email !== undefined) {
      await updateEmail(u.email, data).then((response) => {
        if (response.data.statusCode === 400) {
          alert(response.data.message);
        } else {
          set();
        }
      });
    } else {
      await createOrUpdate(data).then((response) => {
        if (response.data.statusCode === 400) {
          alert(response.data.message);
        } else {
          set();
        }
      });
    }
  };
  // const grupoEdit = () => {
  //    setGrupoEdit(u.grupoId);
  // };
  const handleEdit = (dataUser) => {
    setNome(dataUser.name);
    setEmail(dataUser.email);
    setUsername(dataUser.nickname);
    setGrupo(dataUser.grupoId);
  };
  const fetchGrupos = useCallback(async () => {
    const response = await getGruposUsers();
    // grupoEdit(u);
    console.log(response);
    setGrupos(response.data.message);
  }, []); // eslint-disable-line

  useEffect(() => {
    fetchGrupos();
    handleEdit(u);
  }, []); // eslint-disable-line
  return (
    <div className="userContainer">
      <form className="userForm" onSubmit={handleGravar}>
        <h2>Cadastro novo usuario</h2>
        {u && (
          <div className="flagAtivo">
            <input
              type="checkbox"
              defaultChecked={u.ativo}
              id="ativo"
              onChange={(e) => setAtivo(e.target.checked)}
            />
            <label htmlFor="ativo">Ativo</label>
          </div>
        )}
        <div className="userInputGroup">
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
            <option value="000"> Selecione um grupo</option>
            {grupos.map((g) => (
              <option value={g._id} key={g._id} selected={g._id === grupo}>
                {g.nome}
              </option>
            ))}
          </select>
          {!u && (
            <div className="floating-label-input pass">
              <input
                type="password"
                id="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <label htmlFor="password">Senha</label>
              <span className="line"></span>
            </div>
          )}
        </div>
        <div className="userInputGroup">
          <button type="submit">Gravar</button>
          <button type="submit" className="danger" onClick={() => set()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
