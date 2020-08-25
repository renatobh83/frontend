import React, { useState, useEffect, createContext, useContext } from "react";

import "./styles.css";
import FormSalas from "../Forms/Salas";
import { getSetores, getSalas, activeDeactive } from "../../api/serviceAPI";

export const SalaContext = createContext();
export const useSalaContext = () => useContext(SalaContext);

export default function Salas() {
  const [newRoom, setNewRoom] = useState(false);
  const [setores, setSetores] = useState([]);
  const [salas, setSalas] = useState([]);
  const [setorFilter, setSetorFilter] = useState(null);
  const [salaFilter, setSalaFilter] = useState(null);
  // const [active, setActive] = useState(true);
  const [buttonText, setButtonText] = useState("");
  const [active, setActive] = useState(false);
  const [deactive, setDeactive] = useState(false);

  //pegar setores
  const handleSetores = async () => {
    await getSetores().then((setor) => setSetores(setor.data.message));
  };
  //pegar Salas
  const handleSalas = async () => {
    await getSalas().then((res) => {
      setSalas(res.data.message);
      res.data.message.forEach((sala) => {
        if (sala.ativo === true) {
          console.log("sala Ativo");
          setActive(true);
        } else {
          setDeactive(true);
          console.log("sala inativa");
        }
      });
    });
  };
  // Filter Setor Change
  const selectSetorChange = (e) => {
    setSetorFilter(e);
  };

  //Filter salas Change
  const selectSala = (e) => {
    if (e === "#") {
      setSalaFilter(null);
      setSetorFilter(null);
    } else {
      setSalaFilter(e);
    }
  };

  // Filter setor
  const exibirSalas =
    !setorFilter || setorFilter === "#"
      ? salas
      : salas.filter((setor) => setor.setorId === setorFilter);

  // Filter sala
  const exibiSala =
    !salaFilter || salaFilter === "#"
      ? salas
      : salas.find((s) => s._id === salaFilter);

  // funcao editar

  const activeOrDeactivate = async (e, key) => {
    const salasInativas = salas.find((sala) => sala._id === e);

    if (salasInativas.ativo === true) {
      key.target.innerHTML = "Desativa";
      salasInativas.ativo = false;
      setActive(false);
    } else {
      key.target.innerHTML = "Ativar";
      salasInativas.ativo = true;
      setActive(true);
    }
    const data = {
      ativo: active,
    };
    await activeDeactive(e, data).then((res) => {
      // console.log(res.data.message);
    });
    console.log(salas);
  };

  const setNameButton = () => {
    salas.forEach((sala) => {
      console.log(sala);
    });
    console.log(salas);
  };
  useEffect(() => {
    handleSalas();
    handleSetores();
  }, []);

  const config = {
    setores,
    set: (...p) => setNewRoom(...p),
    setSalas,
    setSalaFilter,
    setSetorFilter,
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
            {!salaFilter && (
              <select
                name="setor"
                id="setor"
                onChange={(e) => selectSetorChange(e.target.value)}
              >
                <option value="#">Setor..</option>
                {setores.map((setor) => (
                  <option key={setor._id} value={setor._id}>
                    {setor.nome}
                  </option>
                ))}
              </select>
            )}
            <select
              id="salas"
              name="salas"
              onChange={(e) => selectSala(e.target.value)}
            >
              <option value="#">Sala...</option>
              {exibirSalas.map((sala) => (
                <option key={sala._id} value={sala._id}>
                  {sala.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="listOfSalas">
            <ul>
              {!salaFilter && salaFilter === null && (
                <>
                  {exibirSalas.map((sala, key) => (
                    <li key={sala._id}>
                      <div className="salaContent">
                        <header>{sala.nome}</header>
                        <button
                          type="submit"
                          onClick={(e) => activeOrDeactivate(sala._id, e)}
                        >
                          {active && "Ad"} {deactive && "AB"}
                        </button>
                      </div>
                    </li>
                  ))}
                </>
              )}
              {salaFilter && salaFilter !== null && (
                <li key={exibiSala._id}>
                  <div className="salaContent">
                    <header>{exibiSala.nome}</header>
                    <button
                      type="submit"
                      onClick={() => activeOrDeactivate(exibiSala._id)}
                    >
                      {active ? "Desativar" : "Ativar"}
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {newRoom && <FormSalas />}
    </SalaContext.Provider>
  );
}
