import React, { useCallback, useEffect, useState } from "react";

import { getSetores, setorDelete } from "../../api/serviceAPI";
import SetorForm from "../Forms/SetorForm";

import logoLoading from "../../assets/loading.svg";
import "./styles.css";
import ModalConfirm from "../../Pages/ModalConfirm/index";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const fetchSetores = useCallback(async () => {
    try {
      const response = await getSetores();
      setSetores(response.data.message);
      setLoading(false);
    } catch (error) {
      const findStr = error.message.search("401");
      if (findStr !== -1) {
        alert("Você não tem permissão para acessar essa área");
        setLoading(false);
        history.push("/");
      }
    }
  }, []); // eslint-disable-line

  const deleteSetor = useCallback((setorId) => {
    setorDelete(setorId).then((res) => {
      if (res.data.statusCode === 400) {
        return alert(res.data.message);
      } else {
        setSetores(res.data.message);
      }
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
