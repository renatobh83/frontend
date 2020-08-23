import React, { useState, useEffect, useCallback } from "react";

import "./styles.css";
import { storePermissao, getPermissoes } from "../../api/serviceAPI";
import { grupoContext } from "../Grupos/index";
export default function Permissoes() {
  const [permissoes, setPermissoes] = useState([]);
  const [permissao, setPermissao] = useState("");

  const handleNewPermission = async (e) => {
    e.preventDefault();
    const data = {
      nome: permissao,
    };
    await storePermissao(data).then((res) => {
      if (res.data.statusCode === 400) alert(res.data.message);
      alert("grupo criado");
    });
  };
  const fetchPermissions = useCallback(async () => {
    const response = await getPermissoes();
    setPermissoes(response.data.message);
  }, []);
  useEffect(() => {
    fetchPermissions();
  }, []);
  return (
    <div className="permissaoContainer">
      <form className="newPermission" onSubmit={handleNewPermission}>
        <div className="floating-label-input">
          <input
            name="nome_permissao"
            id="nome_permissao"
            required
            value={permissao}
            onChange={(e) => setPermissao(e.target.value)}
          />
          <label htmlFor="nome_permissao">Permissão</label>
          <span className="line"></span>
          <button type="submit">Gravar</button>
        </div>
      </form>
      <div className="listPermissions">
        <ul>
          {permissoes.map((permissao) => (
            <li key={permissao._id}>{permissao.nome}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
