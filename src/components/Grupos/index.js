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

import logoLoading from "../../assets/loading.svg";
import NewGroup from "../Forms/Group/index";
import ModalConfirm from "../../Pages/ModalConfirm/";
import { useAuth0 } from "../../Auth0/context";
import { useHistory } from "react-router-dom";

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
              Novo Grupo
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
  const { state } = useAuth0();
  const { permissionShow, setGrupoSelected } = useGrupoContext();
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const permissaoGrupo = (e) => {
    permissionShow(true);
    setGrupoSelected({
      grupo: e,
    });
  };
  const apagarGrupo = useCallback(
    (id) => {
      try {
        deleteGrupo(id).then(() => fetchGrupos());
      } catch (error) {}
    },
    [grupos] // eslint-disable-line
  );

  const fetchGrupos = useCallback(async () => {
    try {
      const response = await getGrupos();
      setGrupos(response.data.message);
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

  useEffect(() => {
    fetchGrupos();
  }, []); // eslint-disable-line
  if (loading) {
    return (
      <div className="loading">
        <img src={logoLoading} alt="loading" />
      </div>
    );
  }
  return (
    <div className="listGrupoContainer">
      <div className="newGroup">{children}</div>
      <div className="contentList">
        <ul>
          {grupos.map((grupo) => (
            <li className="listItem" key={grupo._id}>
              <div className="groupName">{grupo.nome}</div>
              <div className="inputButtons">
                <button type="submit" onClick={() => permissaoGrupo(grupo)}>
                  Permissoes
                </button>
                <ModalConfirm
                  title="Confirma"
                  description="Tem certeza que deseja apagar?"
                >
                  {(confirm) => (
                    <button
                      id="danger"
                      type="submit"
                      onClick={confirm(() => apagarGrupo(grupo._id))}
                    >
                      Apagar
                    </button>
                  )}
                </ModalConfirm>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
