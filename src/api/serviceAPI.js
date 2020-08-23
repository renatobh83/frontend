import axios from "axios";
import { getToken } from "../Utils/inLogin";

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});
const headerDefaults = () => {
  instance.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  instance.defaults.headers.common["withCredentials"] = true;
  instance.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
};
//Server On

export const ServerON = () => {
  const response = instance.get("/ping");
  return response;
};

// Router API USERS/PATIENT
export const getUsers = () => {
  headerDefaults();
  const response = instance.get("/users");
  return response;
};

export const findOrCreatePatient = (data) => {
  headerDefaults();
  const response = instance.post("/users", data);
  return response;
};

export const updateEmail = (params, data) => {
  headerDefaults();
  const response = instance.put(`/users/${params}`, data);
  return response;
};

export const createOrUpdate = (data) => {
  headerDefaults();
  const response = instance.put("/users", data);
  return response;
};

// Router API group

export const getGrupos = async () => {
  headerDefaults();
  const response = instance.get("/grupos");
  return response;
};

export const createGrupo = async (data) => {
  headerDefaults();
  const response = instance.post("/grupos", data);
  return response;
};

export const getGrupo = async (data) => {
  headerDefaults();
  const response = instance.get(`/grupo/${data}`);
  return response;
};

export const deleteGrupo = async (data) => {
  headerDefaults();
  const response = instance.delete(`/grupos/${data}`);
  return response;
};

// Permissao

export const getPermissoes = async () => {
  headerDefaults();
  const response = instance.get("/permissao");
  return response;
};
export const getPermissao = async (data) => {
  const response = instance.get(`/permissao/${data}`);
  return response;
};
export const storePermissao = async (data) => {
  const response = instance.post("/permissao", data);
  return response;
};

export const setPermissoes = async (data) => {
  headerDefaults();
  const response = instance.post("/gp", data);
  return response;
};

// Setor
export const getSetores = async () => {
  headerDefaults();
  const response = instance.get("/setor");
  return response;
};
export const storeSetor = async (data) => {
  headerDefaults();
  const response = instance.post("/setor", data);
  return response;
};
