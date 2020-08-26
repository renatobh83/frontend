import React, { useState, useEffect, useCallback } from "react";

import "./styles.css";
import { storeExame, getSetorId } from "../../../api/serviceAPI";
export default function ProcedimentosForm({ set, setor }) {
  const [nome, setNome] = useState("");
  const [setorNome, setSetorNome] = useState("");

  const getDescSetor = useCallback(async (e) => {
    await getSetorId(e).then((res) => setSetorNome(res.data.message));
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      procedimento: nome,
      setorId: setor,
    };
    await storeExame(data).then((res) => {
      alert("Exame cadastrado");
      setNome("");
    });
  };
  useEffect(() => {
    getDescSetor(setor);
  }, []);
  return (
    <div className="procedimentoForm">
      <form onSubmit={handleSubmit}>
        <h1>Setor: {setorNome.nome}</h1>
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
          <button type="submit" className="danger" onClick={() => set()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
