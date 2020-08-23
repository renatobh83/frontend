import React, { useCallback, useEffect, useState } from "react";

import { getSetores } from "../../api/serviceAPI";
import SetorForm from "../Forms/SetorForm";
import "./styles.css";

export default function Setor() {
  const [setores, setSetores] = useState([]);
  const [newSetor, setNewSetor] = useState(false);

  const editSetor = (e) => {
    console.log(e);
  };
  const fetchSetores = useCallback(async () => {
    const response = await getSetores();

    setSetores(response.data.message);
  }, []);

  useEffect(() => {
    fetchSetores();
  }, []);
  return (
    <>
      {!newSetor && (
        <div className="setContainer">
          <button
            type="submit"
            className="newSetor"
            onClick={() => setNewSetor(true)}
          >
            Novo
          </button>
          <ul>
            {setores.map((setor) => (
              <li key={setor._id}>
                <div className="content">
                  <strong>{setor.nome}</strong>
                  <h5>Tempo execução: {setor.time}</h5>
                  <button type="submit" onClick={() => editSetor(setor)}>
                    Editar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {newSetor && <SetorForm set={setNewSetor} />}
    </>
  );
}
