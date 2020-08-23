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
  const [showPermission, setShowPermission] = useState(false);
  const [grupoSelect, setGrupoSelected] = useState({
    grupo: null,
  });
  const config = {
    grupoNew: (...p) => setNewGrupo(...p),
    permissionShow: (...p) => setShowPermission(...p),
    setGrupoSelected,
    grupoSelect,
  };

  return (
    <>
      <grupoContext.Provider value={config}>
        {!newGrupo && !showPermission && (
          <ListGroup className={!newGrupo ? "hide" : ""}>
            <button type="submit" onClick={() => setNewGrupo(true)}>
              Add New Grupo
            </button>
          </ListGroup>
        )}
        {newGrupo && <NewGroup />}
        {showPermission && <PermissoesGrupo />}
      </grupoContext.Provider>
    </>
  );
}

const ListGroup = ({ children }) => {
  const { grupoNew, permissionShow, setGrupoSelected } = useGrupoContext();
  const [grupos, setGrupos] = useState([]);

  const permissaoGrupo = (e) => {
    permissionShow(true);
    setGrupoSelected({
      grupo: e,
    });
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
    <div className="listGrupoContainer">
      <div className="newGroup">{children}</div>
      <div className="contentList">
        <ul>
          {grupos.map((grupo) => (
            <li className="listItem" key={grupo._id}>
              <div className="grupName">{grupo.nome}</div>
              <div className="inputButtons">
                <button type="submit" onClick={() => permissaoGrupo(grupo)}>
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
  );
};
