import axios from "axios";
import { getToken } from "../Utils/inLogin";

const instance = axios.create({
  baseURL: "http://192.168.1.226:3001/api",
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

// Router API group

export const getGrupos = async () => {
  headerDefaults();
  const response = instance.get("/grupos");
  return response;
};
