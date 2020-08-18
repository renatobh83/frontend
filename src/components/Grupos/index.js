import React, { useState } from "react";
import NewGroup from "../Forms/Group";

import "./sytles.css";
export default function Grupos() {
  const [newGrupo, setNewGrupo] = useState(false);

  return (
    <>
      {!newGrupo && (
        <ListGroup>
          <button type="submit" onClick={() => setNewGrupo(true)}>
            Add New Grupo
          </button>
        </ListGroup>
      )}
      {newGrupo && <NewGroup />}
    </>
  );
}

const ListGroup = ({ children }) => {
  return (
    <div className="listGrupoContainer">
      <div className="newGroup">{children}</div>
      <div className="contentList">
        <ul>
          <li className="listItem">
            <div className="grupName">Administrador</div>
            <div className="inputButtons">
              <button type="submit">Permissoes</button>
              <button id="danger" type="submit">
                Apagar
              </button>
            </div>
          </li>
          <li className="listItem">
            <div className="grupName">Administrador</div>
            <div className="inputButtons">
              <button type="submit">Editar</button>
              <button id="danger" type="submit">
                Apagar
              </button>
            </div>
          </li>
          <li className="listItem">
            <div className="grupName">Administrador</div>
            <div className="inputButtons">
              <button type="submit">Editar</button>
              <button id="danger" type="submit">
                Apagar
              </button>
            </div>
          </li>
          <li className="listItem">
            <div className="grupName">Administrador</div>
            <div className="inputButtons">
              <button type="submit">Editar</button>
              <button id="danger" type="submit">
                Apagar
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
