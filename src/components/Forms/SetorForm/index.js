import React, { useState, useEffect, useCallback } from "react";

import "./styles.css";
import { storeSetor, updateSetor } from "../../../api/serviceAPI";
export default function SetorForm({ set, value }) {
  const [nome, setNome] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nome,
      time,
    };

    if (value.setor !== null) {
      await updateSetor(value.setor._id, data).then(() => {
        set();
      });
    } else {
      await storeSetor(data).then(() => {
        set();
      });
    }
  };
  const handleEditSetor = (e) => {
    if (e.setor !== null) {
      setNome(e.setor.nome);
      setTime(e.setor.time);
    }
  };
  useEffect(() => {
    handleEditSetor(value);
  }, []);

  return (
    <div className="setorFormContainer">
      <form onSubmit={handleSubmit}>
        <div className="setGroup">
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
              type="time"
              id="time"
              required
              min="00"
              max="24"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <label htmlFor="time">tempo </label>
            <span className="line"></span>
          </div>
        </div>
        <div className="btnGroupSetor">
          <button type="submit">Gravar</button>
          <button type="submit" onClick={() => set()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
