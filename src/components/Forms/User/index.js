import React from "react";
import "./styles.css";
export default function NewUser() {
  return (
    <div className="userContainer">
      <form className="userForm">
        <h2>Cadastro novo usuario</h2>
        <div className="userInputGroup user">
          <div className="floating-label-input">
            <input type="text" id="nome" required />
            <label htmlFor="nome">Nome completo</label>
            <span className="line"></span>
          </div>
        </div>
        <div className="userInputGroup username">
          <div className="floating-label-input">
            <input type="text" id="username" required />
            <label htmlFor="username">Usuario</label>
            <span className="line"></span>
          </div>
        </div>
        <div className="userInputGroup email">
          <div className="floating-label-input">
            <input type="email" id="email" required />
            <label htmlFor="email">E-mail</label>
            <span className="line"></span>
          </div>
        </div>
        <div className="userInputGroup">
          <input type="text" id="grupo" name="grupo" placeholder="Grupo" />
        </div>
        <div className="userInputGroup">
          <button type="submit">Gravar</button>
          <button type="submit">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
