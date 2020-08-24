import React, { useState, useEffect, createContext, useContext } from "react";

import "./styles.css";
import FormSalas from "../Forms/Salas";
import { getSetores, getSalas } from "../../api/serviceAPI";

export const SalaContext = createContext();
export const useSalaContext = () => useContext(SalaContext);

export default function Salas() {
  const [newRoom, setNewRoom] = useState(false);
  const [setores, setSetores] = useState([]);
  const [salas, setSalas] = useState([]);
  const handleSetores = async () => {
    await getSetores().then((setor) => setSetores(setor.data.message));
  };

  const handleSalas = async () => {
    await getSalas().then((res) => setSalas(res.data.message));
  };
  useEffect(() => {
    handleSalas();
    handleSetores();
  }, []);

  const config = {
    setores,
    set: (...p) => setNewRoom(...p),
    setSalas,
  };
  return (
    <SalaContext.Provider value={config}>
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
              {setores.map((setor) => (
                <option key={setor._id}>{setor.nome}</option>
              ))}
            </select>
          </div>
          <div className="listOfSalas">
            <ul>
              {salas.map((sala) => (
                <li key={sala._id}>
                  <div className="salaContent">
                    <header>{sala.nome}</header>
                    <button type="submit">edit</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {newRoom && <FormSalas />}
    </SalaContext.Provider>
  );
}
