import React, { useCallback, useEffect, useState } from "react";

import { getSetores, setorDelete } from "../../api/serviceAPI";
import SetorForm from "../Forms/SetorForm";

import logoLoading from "../../assets/loading.svg";
import "./styles.css";
import ModalConfirm from "../../Pages/ModalConfirm/index";

export default function Setor() {
  const [newSetor, setNewSetor] = useState(false);
  const [setor, setSetor] = useState({ setor: null });

  const editSetor = (e) => {
    setSetor({ setor: e });
    setNewSetor(true);
  };
  const cancel = () => {
    setSetor({ setor: null });
    setNewSetor(false);
  };

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
            <ListItem setorEdit={editSetor} />
          </ul>
        </div>
      )}
      {newSetor && <SetorForm set={cancel} value={setor} />}
    </>
  );
}

const ListItem = ({ setorEdit }) => {
  const [setores, setSetores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSetores = useCallback(async () => {
    const response = await getSetores();
    setSetores(response.data.message);
    setLoading(false);
  }, []); // eslint-disable-line

  const deleteSetor = useCallback(async (setorId) => {
    await setorDelete(setorId).then(() => {
      fetchSetores();
    });
  }, []); // eslint-disable-line
  useEffect(() => {
    fetchSetores();
  }, []); // eslint-disable-line
  if (loading) {
    return (
      <div className="loading">
        <img src={logoLoading} alt="loading" />
      </div>
    );
  }

  return (
    <>
      {setores.map((setor) => (
        <li key={setor._id}>
          <div className="content">
            <strong>{setor.nome}</strong>
            <h5>Tempo execução: {setor.time}</h5>
            <button type="submit" onClick={() => setorEdit(setor)}>
              Editar
            </button>
            <ModalConfirm
              title="Confirma"
              description="Tem certeza que deseja apagar?"
            >
              {(confirm) => (
                <button
                  type="submit"
                  className="danger"
                  onClick={confirm(() => deleteSetor(setor._id))}
                >
                  Apagar
                </button>
              )}
            </ModalConfirm>
          </div>
        </li>
      ))}
    </>
  );
};
