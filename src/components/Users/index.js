import React, { useState, useEffect } from "react";

import "./sytles.css";
import NewUser from "../Forms/User/index";
import { getUsers } from "../../api/serviceAPI";

import logoLoading from "../../assets/loading.svg";
import { useHistory } from "react-router-dom";
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
            Adicionar novo usuario
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
  const [loading, setLoading] = useState(true);

  const [userView, setUserView] = useState([]);
  const history = useHistory();

  const handleEdit = (user, bool) => {
    const data = {
      user: user,
      action: bool,
    };
    set(data);
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        const users = response.data.message.filter(
          (user) => user.ativo === true
        );
        setUsers(users);
        setUserView(response.data.message);
        setLoading(false);
      } catch (error) {
        const findStr = error.message.search("401");
        if (findStr !== -1) {
          setLoading(false);
          alert("Você não tem permissão para acessar essa área");
          history.push("/");
        }
      }
    }
    fetchUsers();
    // console.log("Users");
  }, [history]);
  useEffect(() => {
    if (filter === "false") {
      const inativos = userView.filter((user) => user.ativo === false);
      setUsers(inativos);
    } else {
      const ativos = userView.filter((user) => user.ativo === true);
      setUsers(ativos);
    }
  }, [filter, userView]);
  if (loading) {
    return (
      <div className="loading">
        <img src={logoLoading} alt="loading" />
      </div>
    );
  }

  return (
    <div className="listUserContainer">
      <div className="newUser">{children}</div>
      <div className="contentUsers">
        {users.map((user) => (
          <div className="cardUser" key={user._id}>
            <header className="dados">
              <h2>{user.name}</h2>
              <h6>Usuario - {user.nickname}</h6>
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
