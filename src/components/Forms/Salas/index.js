import React, { useState } from "react";

import "./styles.css";

function FormSalas({ set }) {
  const [setor, setSetor] = useState("");
  const [nome, setNome] = useState("");

  const changeSetor = (e) => {
    setNome("");
    setSetor(e);
  };
  const handleExit = () => {
    set(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      setor,
      nome,
    };
    console.log(data);
    handleExit();
  };
  return (
    <div className="formContinerSalas">
      <form onSubmit={handleSubmit}>
        <div className="grupoInput">
          <select value={setor} onChange={(e) => changeSetor(e.target.value)}>
            <option value="">Setor</option>
            <option value="rx">Rx</option>
            <option value="rm">Rm</option>
            <option value="us">Us</option>
          </select>
        </div>
        {setor && (
          <div className="grupoInput">
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
          </div>
        )}
        <div className="btnGrupo">
          {setor && <button type="submit">Gravar</button>}
          <button type="submit" className="danger" onClick={() => handleExit()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormSalas;
