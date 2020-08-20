import React from "react";
import "./styles.css";
import { useState } from "react";
import { createGrupo } from "../../../api/serviceAPI";

export default function NewGroup({ set }) {
  const [admin, setAdmin] = useState(false);
  const [nome, setNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome,
      admin,
    };
    try {
      await createGrupo(data).then(() => set(false));
    } catch (error) {}
  };
  return (
    <div className="container-group">
      <form className="form-control" onSubmit={handleSubmit}>
        <h2>Cadastro novo grupo</h2>
        <div className="adminGrup">
          <input
            type="checkbox"
            name="admin"
            id="admin"
            onChange={(e) => setAdmin(e.target.checked)}
          />
          <label htmlFor="admin">Admin</label>
        </div>
        <div className="input-group">
          <div className="floating-label-input">
            <input
              type="text"
              id="grupo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="grupo">Grupo</label>
            <span className="line"></span>
          </div>
        </div>
        <div className="input-group">
          <button type="submit">Gravar</button>
          <button type="submit" onClick={() => set(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
