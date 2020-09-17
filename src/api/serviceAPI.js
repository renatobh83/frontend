import axios from "axios";

import { getToken } from "../Utils/inLogin";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
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
// rota usada no login
export const getUserLogin = () => {
  headerDefaults();
  const response = instance.get("/users/login");
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

// Pacientes

export const getPacientes = () => {
  headerDefaults();
  const response = instance.get("/pacientes");
  return response;
};

// Router API group

export const getGrupos = async () => {
  headerDefaults();
  const response = instance.get("/grupos");
  return response;
};

export const getGruposUsers = async () => {
  headerDefaults();
  const response = instance.get("/grupos/users");
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

export const getSetoresSala = async () => {
  headerDefaults();
  const response = instance.get("/setor/sala");
  return response;
};

export const storeSetor = async (data) => {
  headerDefaults();
  const response = instance.post("/setor", data);
  return response;
};
export const updateSetor = async (id, data) => {
  headerDefaults();
  const response = instance.put(`/setor/${id}`, data);
  return response;
};

export const getSetorId = async (id, data) => {
  headerDefaults();
  const response = instance.get(`/setor/${id}`);
  return response;
};
export const setorDelete = async (data) => {
  headerDefaults();
  const response = instance.delete(`/setor/${data}`);
  return response;
};

//salas

export const getSalas = async () => {
  headerDefaults();
  const response = instance.get("/salas");
  return response;
};
export const getSalaFromSetor = async (id) => {
  headerDefaults();
  const response = instance.get(`/sala/${id}`);
  return response;
};
export const storeSala = async (data) => {
  headerDefaults();
  const response = instance.post("/salas", data);
  return response;
};

export const activeDeactive = async (id) => {
  headerDefaults();
  const response = instance.delete(`/salas/${id}`);
  return response;
};

// exames

export const getExames = async () => {
  headerDefaults();
  const response = instance.get("/procedimentos");
  return response;
};
export const getExamesAgendamento = async () => {
  headerDefaults();
  const response = instance.get("/procedimentos/agendamento");
  return response;
};
export const storeExame = async (data) => {
  headerDefaults();
  const response = instance.post("/procedimentos", data);
  return response;
};

export const activeOrDeactive = async (id, data) => {
  headerDefaults();
  const response = instance.put(`/procedimentos/${id}`, data);
  return response;
};
export const deleteProcedimento = async (id) => {
  headerDefaults();
  const response = instance.delete(`/procedimentos/${id}`);
  return response;
};

export const getExamesFromPlanos = async (id) => {
  headerDefaults();
  const response = instance.get(`/planos/${id}`);
  return response;
};

// Horarios

export const storeHorarios = async (data) => {
  headerDefaults();
  const response = instance.post("/horarios", data);
  return response;
};

export const getHorariosBySala = async (data) => {
  headerDefaults();
  const response = instance.get(`/horario/${data}`);
  return response;
};
export const getHorariosBySetor = async (setor, data) => {
  headerDefaults();
  const response = instance.get(`/horarios/${setor}`, { params: data });
  return response;
};

export const deleteHorario = async (data) => {
  headerDefaults();
  const response = instance.post("/horarios/delete", data);
  return response;
};
export const inativarHorarioPassado = async (data) => {
  headerDefaults();
  const response = instance.put("/horarios/inativo", data);
  return response;
};
export const updateHorarioSelecionado = async (data) => {
  headerDefaults();
  const response = instance.put("/horarios/", data);
  return response;
};
// dados agendamento
export const storeAgendamento = async (data) => {
  headerDefaults();
  const response = instance.post("/da/", data);
  return response;
};

export const agendamentosPaciente = async (id) => {
  headerDefaults();
  const response = instance.get(`/da/${id}`);
  return response;
};
export const cancelaAgendamentoPaciente = async (id) => {
  headerDefaults();
  const response = instance.delete(`/da/${id}`);
  return response;
};
// planos

export const storePlano = async (data) => {
  headerDefaults();
  const response = instance.post("/planos/", data);
  return response;
};

export const getplanos = async () => {
  headerDefaults();
  const response = instance.get("/planos/");
  return response;
};
export const getplanosAgendamento = async () => {
  headerDefaults();
  const response = instance.get("/planos/agendamento");
  return response;
};
export const updatePlano = async (id, data) => {
  headerDefaults();
  const response = instance.put(`/planos/${id}`, data);
  return response;
};

// Tabelas de exames

export const storeTabela = async (data) => {
  headerDefaults();
  const response = instance.post("/tabelas", data);
  return response;
};

export const getTabelas = async () => {
  headerDefaults();
  const response = instance.get("/tabelas");
  return response;
};

export const updateTabela = async (id, data) => {
  headerDefaults();
  const response = instance.put(`/tabelas/${id}`, data);
  return response;
};
