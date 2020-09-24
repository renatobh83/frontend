import React, { useEffect, useState } from "react";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import { FiMenu, FiLogOut, FiUser } from "react-icons/fi";
import "./styles.css";
import { useAuth0 } from "../../Auth0/context";
import { getGrupoPermissao, getPermissoes } from "../../api/serviceAPI";
import { FiHeart } from "react-icons/fi";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, state } = useAuth0();
  const [stateMenuOpt, setSate] = useState({
    USUARIOS: false,
    GRUPOS: false,
    SETOR: false,
    SALAS: false,
    PROCEDIMENTOS: false,
    TABELAS: false,
    PLANOS: false,
    HORARIOS: false,
    RELATORIOS: false,
    mFAturamento: false,
    mCadastro: false,
  });

  const userPermissoes = async () => {
    if (!state.responseAPI.message.paciente) {
      const idPermissao = await getPermissoes();
      const grupo = await getGrupoPermissao(state.responseAPI.message.grupoId);
      if (grupo && idPermissao) {
        const permissaoFiltered = idPermissao.data.message.filter((el) => {
          return grupo.data.message.permissaoId.some((f) => {
            return f === el._id;
          });
        });
        let newState = Object.assign({}, stateMenuOpt);

        permissaoFiltered.map((p) => {
          switch (p.nome) {
            case "GRUPOS":
              newState.GRUPOS = true;
              newState.mCadastro = true;
              break;
            case "USUARIOS":
              newState.USUARIOS = true;
              newState.mCadastro = true;
              break;
            case "SETOR":
              newState.SETOR = true;
              newState.mCadastro = true;
              break;
            case "SALAS":
              newState.SALAS = true;
              newState.mCadastro = true;
              break;
            case "PROCEDIMENTOS":
              newState.mFAturamento = true;
              newState.PROCEDIMENTOS = true;
              break;

            case "TABELAS":
              newState.mFAturamento = true;
              newState.TABELAS = true;
              break;

            case "PLANOS":
              newState.mFAturamento = true;
              newState.PLANOS = true;
              break;

            case "HORARIOS":
              newState.HORARIOS = true;
              break;
            case "RELATORIOS":
              newState.RELATORIOS = true;
              break;

            default:
              break;
          }
        });
        setSate(newState);
      }
    }
  };
  useEffect(() => {
    userPermissoes();
  }, []); //eslint-disable-line
  return (
    <>
      <input
        type="checkbox"
        id="check"
        checked={isOpen}
        value={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <label htmlFor="check" id="icone">
        <FiMenu size={40} />
      </label>
      <div className="menuBar">
        <nav>
          <ul className="menu">
            <li className="nav-item">
              <Link
                className="link"
                tag={RouterNavLink}
                onClick={() => setIsOpen(!isOpen)}
                to="/"
              >
                Home
              </Link>
            </li>
            {!state.responseAPI.message.paciente && (
              <>
                <li className="nav-item">
                  <Link
                    className="link"
                    tag={RouterNavLink}
                    onClick={() => setIsOpen(!isOpen)}
                    to="/agendar"
                  >
                    Agendamento
                  </Link>
                </li>

                {stateMenuOpt.HORARIOS && (
                  <li className="nav-item">
                    <Link
                      className="link"
                      tag={RouterNavLink}
                      onClick={() => setIsOpen(!isOpen)}
                      to="/horarios"
                    >
                      Gerar horario
                    </Link>
                  </li>
                )}
                {stateMenuOpt.mFAturamento && (
                  <li className="nav-item">
                    <span>Faturamento</span>
                    <ul className="dropSubmenu">
                      {stateMenuOpt.PROCEDIMENTOS && (
                        <Link
                          tag={RouterNavLink}
                          className="dropSubItem"
                          onClick={() => setIsOpen(!isOpen)}
                          to="/exames"
                        >
                          Procedimentos
                        </Link>
                      )}
                      {stateMenuOpt.TABELAS && (
                        <Link
                          tag={RouterNavLink}
                          className="dropSubItem"
                          onClick={() => setIsOpen(!isOpen)}
                          to="/tabelas"
                        >
                          Tabelas
                        </Link>
                      )}
                      {stateMenuOpt.PLANOS && (
                        <Link
                          tag={RouterNavLink}
                          className="dropSubItem"
                          onClick={() => setIsOpen(!isOpen)}
                          to="/planos"
                        >
                          Planos
                        </Link>
                      )}
                    </ul>
                  </li>
                )}
                {stateMenuOpt.mCadastro && (
                  <li className="nav-item">
                    <span>Cadastros</span>

                    <ul className="dropSubmenu">
                      {stateMenuOpt.GRUPOS && (
                        <Link
                          tag={RouterNavLink}
                          className="dropSubItem"
                          onClick={() => setIsOpen(!isOpen)}
                          to="/grupo"
                        >
                          Grupo
                        </Link>
                      )}
                      {stateMenuOpt.USUARIOS && (
                        <Link
                          tag={RouterNavLink}
                          className="dropSubItem"
                          onClick={() => setIsOpen(!isOpen)}
                          to="/users"
                        >
                          Usuarios
                        </Link>
                      )}
                      {stateMenuOpt.SETOR && (
                        <Link
                          tag={RouterNavLink}
                          className="dropSubItem"
                          onClick={() => setIsOpen(!isOpen)}
                          to="/setor"
                        >
                          Setor
                        </Link>
                      )}
                      {stateMenuOpt.SALAS && (
                        <Link
                          tag={RouterNavLink}
                          className="dropSubItem"
                          onClick={() => setIsOpen(!isOpen)}
                          to="/salas"
                        >
                          Salas
                        </Link>
                      )}
                    </ul>
                  </li>
                )}
                {stateMenuOpt.RELATORIOS && (
                  <li className="nav-item">
                    <Link
                      className="link"
                      tag={RouterNavLink}
                      onClick={() => setIsOpen(!isOpen)}
                      to="/relatorios"
                    >
                      Relatórios
                    </Link>
                  </li>
                )}
              </>
            )}
            <li className="nav-item " id="profile">
              <Link
                className="link"
                tag={RouterNavLink}
                onClick={() => setIsOpen(!isOpen)}
                to="/profile"
              >
                <FiUser className="mr-10" />
                Profile
              </Link>
            </li>
            <li>
              <div className="btnlogout">
                <button onClick={logout}>Logout</button>
              </div>
            </li>
          </ul>
          <div className="dropdown">
            <div className="dropBtn">
              {state.responseAPI.message.picture ? (
                <img src={state.responseAPI.message.picture} alt="avatar" />
              ) : (
                <FiHeart size={32} className="imgProf" />
              )}
              <div className="dropContent">
                <Link
                  className="link"
                  tag={RouterNavLink}
                  onClick={() => setIsOpen(!isOpen)}
                  to="/profile"
                >
                  <FiUser className="mr-10" />
                  Profile
                </Link>
                <Link>
                  <FiLogOut className="mr-10" />
                  <span onClick={logout}>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
