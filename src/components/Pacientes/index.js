import React, { useState, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";

import "./styles.css";

import AgendaDash from "../AgendaDash";
import { chekAcesso, getPacientes } from "../../api/serviceAPI";
import logoLoading from "../../assets/loading.svg";
import NewPaciente from "../Forms/NewPaciente";

import { useHistory } from "react-router-dom";
export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState(true);
  const [isNew, setNew] = useState(false);
  const [searchItem, setSearchItem] = useState(null);
  const [pacienteNome, setPacienteNome] = useState(null);
  const [pacienteEdit, setPacienteEdit] = useState(null);
  const [pacienteSelect, setPacienteSelect] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const handlePacientes = useCallback(async () => {
    const response = await getPacientes();
    setPacientes(response.data.message);
    setLoading(false);
  }, []);

  //Carrega pacientes
  useEffect(() => {}, [handlePacientes]);

  // seleciona Paciente
  const selectPaciente = (e) => {
    setPacienteSelect(e);
    nomePaciente(e);
  };
  const acesso = async () => {
    try {
      await chekAcesso();
      setLoading(false);
    } catch (error) {
      const findStr = error.message.search("401");
      if (findStr !== -1) {
        alert("Você não tem permissão para acessar essa área");
        setLoading(false);
        history.push("/");
      }
    }
  };
  // get Nome paciente
  const nomePaciente = (e) => {
    const paciente = pacientes.find((p) => p._id === e);
    setPacienteNome(paciente.name);
    setPacienteEdit(paciente);
  };
  // Abrir form cadastro/edit
  const setFormNew = (e) => {
    setPacienteSelect(e._id);
    setPacienteNome(e.name);
    setSearch(!search);
  };

  // Button confirma acao
  const confirmarPaciente = () => {
    if (pacienteSelect !== null) {
      setSearch(!search);
    } else {
      alert("Selecione um paciente");
    }
  };
  // cancela pesquisa paciente
  const cancelar = () => {
    setSearch(!search);
    setPacienteSelect(null);
  };

  const addOrEdit = () => {
    setNew(!isNew);
  };
  // esculta input search
  const handleChange = (e) => {
    handlePacientes();
    setPacienteSelect(null);
    setSearchItem(e.target.value);
    setPacienteEdit(null);
  };
  // pesquisa paciente
  const filter = !searchItem
    ? pacientes
    : pacientes.filter((paciente) =>
        paciente.name.toLowerCase().includes(searchItem.toLocaleLowerCase())
      );
  useEffect(() => {
    acesso();
  }, []); //eslint-disable-line
  if (loading) {
    return (
      <div className="loading">
        <img src={logoLoading} alt="loading" />
      </div>
    );
  }
  return (
    <div className="agendamentoContainer">
      {search && !isNew && (
        <>
          <div className="pesquisaPaciente">
            <div className="pesquisa">
              <h3>Paciente</h3>
              <div className="search">
                <input
                  type="search"
                  name="paciente"
                  value={searchItem}
                  placeholder="Nome do paciente"
                  onChange={handleChange}
                />
                <div className="icon">
                  <FiSearch size={30} />
                </div>
              </div>
            </div>
          </div>
          {filter.length >= 1 && (
            <div className="listPatients">
              <ul>
                {filter.map((paciente) => (
                  <div className="patientContent">
                    <li key={paciente._id}>
                      <input
                        type="radio"
                        name="paciente"
                        id={paciente._id}
                        className="regular-radio"
                        value={paciente._id}
                        onChange={(e) => selectPaciente(e.target.value)}
                      />

                      <label htmlFor={paciente._id}>
                        {paciente.name} - {paciente.dtNascimento} -
                        {paciente.email}
                      </label>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <div className="grupButtons">
            <button type="submit" onClick={() => addOrEdit()}>
              {pacienteSelect !== null ? "Editar Cadastro " : "Novo cadastro"}
            </button>
            <button type="submit" onClick={() => confirmarPaciente()}>
              Confirmar Paciente
            </button>
          </div>
        </>
      )}

      {isNew && (
        <NewPaciente
          close={setNew}
          setNewPaciente={setFormNew}
          paciente={pacienteEdit}
        />
      )}
      {!search && (
        <div className="agendamentosPaciente">
          <div className="btnBack">
            <button type="submit" onClick={() => cancelar()}>
              Voltar
            </button>
            <strong>Paciente: {pacienteNome}</strong>
          </div>

          <AgendaDash pacienteid={pacienteSelect} />
        </div>
      )}
    </div>
  );
}
