import React, { useState, useEffect } from "react";

import "./sytles.css";
import NewUser from "../Forms/User/index";
import { getUsers, getGrupo } from "../../api/serviceAPI";

export default function Users() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState("");
  const [filter, setFilter] = useState(true);
  const listUser = (e) => {
    setNewUser(e.action);
    setUser(e.user);
  };

  const cancel = () => {
    setUser("");
    setNewUser(false);

    setFilter(!filter);
  };
  return (
    <>
      {!newUser && (
        <ListOfUsers set={listUser} filter={filter}>
          <button type="submit" onClick={() => setNewUser(true)}>
            Add New User
          </button>
          <div className="select" onChange={(e) => setFilter(e.target.value)}>
            <label htmlFor="ativo">Ativo</label>
            <select name="ativo" id="ativo">
              <option value="true" defaultValue>
                Sim
              </option>
              <option value="false">Nao</option>
            </select>
          </div>
        </ListOfUsers>
      )}
      {newUser && <NewUser set={cancel} u={user} />}
    </>
  );
}

const ListOfUsers = ({ children, set, filter }) => {
  const [users, setUsers] = useState([]);

  const [userView, setUserView] = useState([]);
  const handleEdit = (user, bool) => {
    const data = {
      user: user,
      action: bool,
    };
    set(data);
  };

  useEffect(() => {
    async function fetchUsers() {
      const response = await getUsers();

      response.data.message.filter(async (user) => {
        const grupo = await getGrupo(user.grupoId);
        return Object.assign(user, { grupo: grupo.data.message.nome });
      });
      setUserView(response.data.message);
    }
    fetchUsers();
  }, []);
  useEffect(() => {
    if (filter === "false") {
      const inativos = userView.filter((user) => user.ativo === false);
      setUsers(inativos);
    } else {
      const ativos = userView.filter((user) => user.ativo === true);
      setUsers(ativos);
    }
  }, [filter]);
  console.log(userView);
  return (
    <div className="listUserContainer">
      <div className="newUser">{children}</div>
      <div className="contentUsers">
        {users.map((user) => (
          <div className="cardUser" key={user._id}>
            <header className="dados">
              <h2>{user.nome}</h2>
              <h6>Usuario - {user.username}</h6>
              <p>{user.email}</p>
              <strong>{user.grupo}</strong>
            </header>
            <div className="btnGroup">
              <button type="submit" onClick={() => handleEdit(user, true)}>
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
