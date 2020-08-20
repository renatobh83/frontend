import React, { useState, useCallback, useEffect } from "react";
import NewGroup from "../Forms/Group";

import "./sytles.css";
import Permissoes from "../Permissoes";
import { getGrupos } from "../../api/serviceAPI";
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
      {newGrupo && <NewGroup set={setNewGrupo} />}
    </>
  );
}

const ListGroup = ({ children }) => {
  const [grupos, setGrupos] = useState([]);
  const fetchGrupos = useCallback(async () => {
    const response = await getGrupos();
    setGrupos(response.data.message);
  }, [grupos]);

  useEffect(() => {
    fetchGrupos();
  }, []);
  return (
    <div className="listGrupoContainer">
      <div className="newGroup">{children}</div>
      <div className="contentList">
        <ul>
          {grupos.map((grupo) => (
            <li className="listItem" key={grupo._id}>
              <div className="grupName">{grupo.nome}</div>
              <div className="inputButtons">
                <button type="submit">Permissoes</button>
                <button id="danger" type="submit">
                  Apagar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
