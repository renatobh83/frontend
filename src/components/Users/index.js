import React, { useState } from "react";

import "./sytles.css";
import NewUser from "../Forms/User/index";
export default function Users() {
  const [newUser, setNewUser] = useState(false);
  return (
    <>
      {!newUser && (
        <ListOfUsers>
          <button type="submit" onClick={() => setNewUser(true)}>
            Add New User
          </button>
        </ListOfUsers>
      )}
      {newUser && <NewUser set={setNewUser} />}
    </>
  );
}

const ListOfUsers = ({ children }) => {
  return (
    <div className="listUserContainer">
      <div className="newUser">{children}</div>
      <div className="contentUsers">
        <div className="cardUser">
          <header className="dados">
            <h2>Renato Lucio de Mendonca</h2>
            <p>neo_rlm@hotmail.com</p>
            <strong>Adminstrador</strong>
          </header>
          <div className="btnGroup">
            <button type="submit">Editar</button>
          </div>
        </div>
        <div className="cardUser">
          <header className="dados">
            <h2>Renato Lucio de Mendonca</h2>
            <p>neo_rlm@hotmail.com</p>
            <strong>Adminstrador</strong>
          </header>
          <div className="btnGroup">
            <button type="submit">Editar</button>
          </div>
        </div>
        <div className="cardUser">
          <header className="dados">
            <h2> Renato Lucio de Mendonca</h2>
            <p>Email</p>
            <strong>Grupo</strong>
          </header>
          <div className="btnGroup">
            <button type="submit">Editar</button>
          </div>
        </div>
        <div className="cardUser">
          <header className="dados">
            <h2>Nome</h2>
            <p>Email</p>
            <strong>Grupo</strong>
          </header>
          <div className="btnGroup">
            <button type="submit">Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
