import React, { useEffect, useState } from "react";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import { FiMenu, FiLogOut, FiUser } from "react-icons/fi";
import "./styles.css";
import { useAuth0 } from "../../Auth0/context";
import { getGrupoPermissao, getPermissoes } from "../../api/serviceAPI";

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, state } = useAuth0();
  const [stateMenuOpt, setSate] = useState({
    USUARIO: null,
    TABELAS: null,
  });

  const userPermissoes = async () => {
    const idPermissao = await getPermissoes();
    const grupo = await getGrupoPermissao(state.responseAPI.message.grupoId);
    if (grupo && idPermissao) {
      const permissaoFiltered = idPermissao.data.message.filter((el) => {
        return grupo.data.message.permissaoId.some((f) => {
          return f === el._id;
        });
      });
      const key = "USUARIOS";
      for (let index = 0; index < permissaoFiltered.length; index++) {
        console.log(stateMenuOpt[key]);
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
            {!state.responseAPI.message.paciente && (
              <>
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
                <li className="nav-item">
                  <span>Faturamento</span>
                  <ul className="dropSubmenu">
                    <Link
                      tag={RouterNavLink}
                      className="dropSubItem"
                      onClick={() => setIsOpen(!isOpen)}
                      to="/exames"
                    >
                      Procedimentos
                    </Link>
                    <Link
                      tag={RouterNavLink}
                      className="dropSubItem"
                      onClick={() => setIsOpen(!isOpen)}
                      to="/tabelas"
                    >
                      Tabelas
                    </Link>
                    <Link
                      tag={RouterNavLink}
                      className="dropSubItem"
                      onClick={() => setIsOpen(!isOpen)}
                      to="/planos"
                    >
                      Planos
                    </Link>
                  </ul>
                </li>
                <li className="nav-item">
                  <span>Cadastros</span>
                  <ul className="dropSubmenu">
                    <Link
                      tag={RouterNavLink}
                      className="dropSubItem"
                      onClick={() => setIsOpen(!isOpen)}
                      to="/grupo"
                    >
                      Grupo
                    </Link>
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
                    <Link
                      tag={RouterNavLink}
                      className="dropSubItem"
                      onClick={() => setIsOpen(!isOpen)}
                      to="/setor"
                    >
                      Setor
                    </Link>
                    <Link
                      tag={RouterNavLink}
                      className="dropSubItem"
                      onClick={() => setIsOpen(!isOpen)}
                      to="/salas"
                    >
                      Salas
                    </Link>
                  </ul>
                </li>

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
              <img
                src="https://img.icons8.com/carbon-copy/2x/homer-simpson.png"
                alt=""
              />
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
