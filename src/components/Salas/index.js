import React, { useState } from "react";

import "./styles.css";
import FormSalas from "../Forms/Salas";
export default function Salas() {
  const [newRoom, setNewRoom] = useState(false);
  return (
    <>
      {!newRoom && (
        <div className="salasContainer">
          <div className="novaSala">
            <button type="submit" onClick={() => setNewRoom(true)}>
              Nova Sala
            </button>
          </div>
          <div className="selectSalas">
            <select>
              <option>Sala...</option>
            </select>
            <select name="" id="">
              <option value="">Setor..</option>
              <option>RX</option>
              <option>RM</option>
            </select>
          </div>
          <div className="listOfSalas">
            <ul>
              <li>
                <div className="salaContent">
                  <header>Sala1</header>
                  <button type="submit">edit</button>
                </div>
              </li>
              <li>
                <div className="salaContent">
                  <header>Sala1</header>
                  <button type="submit">edit</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
      {newRoom && <FormSalas set={setNewRoom} />}
    </>
  );
}
