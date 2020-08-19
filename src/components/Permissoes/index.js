import React from "react";

import "./styles.css";
export default function Permissoes() {
  const handleNewPerrmission = (e) => {
    e.preventDefault();
  };
  return (
    <div className="permissaoContainer">
      <form className="newPermission" onSubmit={(e) => handleNewPerrmission(e)}>
        <div className="floating-label-input">
          <input name="nome_permissao" id="nome_permissao" required />
          <label htmlFor="nome_permissao">Permissão</label>
          <span className="line"></span>
          <button type="submit">Gravar</button>
        </div>
      </form>
      <div className="listPermissions">
        <ul>
          <li>Admin</li>
          <li>ADmun</li>
          <li>us</li>
        </ul>
      </div>
    </div>
  );
}
