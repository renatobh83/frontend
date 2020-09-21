import React, { useState } from "react";

import "./styles.css";
import { useContextProce } from "../../Procedimentos/index";
import { storeExame } from "../../../api/serviceAPI";
export default function ProcedimentosForm() {
  const { setNew, setorSelect } = useContextProce();

  const [nome, setNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      procedimento: nome,
      setor: setorSelect._id,
      tempo: setorSelect.time,
    };

    await storeExame(data).then((res) => {
      alert("Exame cadastrado");
      setNome("");
    });
  };

  return (
    <div className="procedimentoForm">
      <form onSubmit={handleSubmit}>
        <h1>Setor: {setorSelect.nome}</h1>
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
        <div className="btnGroups">
          <button type="submit">Gravar</button>
          <button type="submit" className="danger" onClick={() => setNew()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
