import React, { useState } from "react";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import { FiMenu, FiLogOut, FiUser } from "react-icons/fi";
import "./styles.css";
import { useAuth0 } from "../../Auth0/context";

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth0();

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
                to="/horarios"
              >
                Horarios
              </Link>
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
                <Link
                  tag={RouterNavLink}
                  className="dropSubItem"
                  onClick={() => setIsOpen(!isOpen)}
                  to="/users"
                >
                  Usuarios
                </Link>
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
                <Link
                  tag={RouterNavLink}
                  className="dropSubItem"
                  onClick={() => setIsOpen(!isOpen)}
                  to="/exames"
                >
                  Procedimentos
                </Link>
              </ul>
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

            <div className="btnlogout">
              <button onClick={logout}>Logout</button>
            </div>
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
                <button onClick={logout}>
                  <FiLogOut className="mr-10" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
