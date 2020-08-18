import React from "react";
import "./styles.css";

export default function NewGroup() {
  return (
    <div className="container-group">
      <form className="form-control">
        <h2>Cadastro novo grupo</h2>
        <div className="adminGrup">
          <input type="checkbox" name="admin" id="admin" />
          <label htmlFor="admin">Admin</label>
        </div>
        <div className="input-group">
          <div className="floating-label-input">
            <input type="text" id="grupo" required />
            <label htmlFor="grupo">Grupo</label>
            <span className="line"></span>
          </div>
        </div>
        <div className="input-group">
          <button type="submit">Gravar</button>
          <button type="submit">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
