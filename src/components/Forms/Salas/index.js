import React, { useState } from "react";

import "./styles.css";
import { useSalaContext } from "../../Salas";
import { storeSala } from "../../../api/serviceAPI";

function FormSalas() {
  const {
    setores,
    set,
    setSalas,
    setSetorFilter,
    setSalaFilter,
  } = useSalaContext();
  const [setor, setSetor] = useState("");
  const [nome, setNome] = useState("");

  const changeSetor = (e) => {
    setNome("");
    setSetor(e);
  };

  const handleExit = () => {
    set(false);
    setSalaFilter(null);
    setSetorFilter(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      setorId: setor,
      nome,
    };
    await storeSala(data).then((response) => {
      setSalas((oldArray) => [...oldArray, response.data.message]);
      handleExit();
    });
  };
  return (
    <div className="formContinerSalas">
      <form onSubmit={handleSubmit}>
        <div className="grupoInput">
          <select value={setor} onChange={(e) => changeSetor(e.target.value)}>
            <option value="">Setor</option>
            {setores.map((setor) => (
              <option value={setor._id}>{setor.nome}</option>
            ))}
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
