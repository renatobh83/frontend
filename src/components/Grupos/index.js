import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  createContext,
} from "react";

import "./sytles.css";
import { getGrupos, deleteGrupo } from "../../api/serviceAPI";
import PermissoesGrupo from "../../Pages/PermissoesGrupo";
import NewGroup from "../Forms/Group/index";
export const grupoContext = createContext();
export const useGrupoContext = () => useContext(grupoContext);

export default function Grupos() {
  const [newGrupo, setNewGrupo] = useState(false);

  const config = {
    grupoNew: (...p) => setNewGrupo(...p),
  };

  return (
    <>
      <grupoContext.Provider value={config}>
        {!newGrupo && (
          <ListGroup className={!newGrupo ? "hide" : ""}>
            <button type="submit" onClick={() => setNewGrupo(true)}>
              Add New Grupo
            </button>
          </ListGroup>
        )}
        {newGrupo && <NewGroup />}
      </grupoContext.Provider>
    </>
  );
}

const ListGroup = ({ children }) => {
  const { grupoNew } = useGrupoContext();
  const [grupos, setGrupos] = useState([]);
  const [showPermissao, setShowPermissao] = useState(false);

  const permissaoGrupo = () => {
    setShowPermissao(!showPermissao);
  };
  const apagarGrupo = useCallback(async (id) => {
    await deleteGrupo(id).then(() => fetchGrupos());
  }, []);

  const fetchGrupos = useCallback(async () => {
    const response = await getGrupos();
    setGrupos(response.data.message);
  }, []);

  useEffect(() => {
    fetchGrupos();
  }, []);
  return (
    <>
      <div className="listGrupoContainer">
        <div className="newGroup">{children}</div>
        <div className="contentList">
          <ul>
            {grupos.map((grupo) => (
              <li className="listItem" key={grupo._id}>
                <div className="grupName">{grupo.nome}</div>
                <div className="inputButtons">
                  <button type="submit" onClick={() => permissaoGrupo()}>
                    Permissoes
                  </button>
                  <button
                    id="danger"
                    type="submit"
                    onClick={() => apagarGrupo(grupo._id)}
                  >
                    Apagar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showPermissao && <PermissoesGrupo />}
    </>
  );
};
