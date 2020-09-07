import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

import "./styles.css";
import Main from "../Main/";
import AgendaDash from "../AgendaDash";
import { getPacientes } from "../../api/serviceAPI";
import { useEffect } from "react";
import { useCallback } from "react";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState(true);
  const [isNew, setNew] = useState(false);
  const [searchItem, setSearchItem] = useState(null);

  const [pacienteSelect, setPacienteSelect] = useState(null);

  const handlePacientes = useCallback(async () => {
    const response = await getPacientes();
    setPacientes(response.data.message);
  }, []);

  useEffect(() => {}, [handlePacientes]);

  const selectPaciente = (e) => {
    console.log(e);
    setPacienteSelect(e);
  };
  const confirmarPaciente = () => {
    if (pacienteSelect !== null) {
      setSearch(!search);
    } else {
      alert("Selecione um paciente");
    }
  };
  const cancelar = () => {
    setSearch(!search);
    setPacienteSelect(null);
  };
  const handleChange = (e) => {
    handlePacientes();
    setSearchItem(e.target.value);
  };
  const filter = !searchItem
    ? pacientes
    : pacientes.filter((paciente) =>
        paciente.nome.toLowerCase().includes(searchItem.toLocaleLowerCase())
      );

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
                      <label htmlFor={paciente._id}>{paciente.nome}</label>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <div className="grupButtons">
            <button type="submit" onClick={() => setNew(!isNew)}>
              Novo Cadastro
            </button>
            <button type="submit" onClick={() => confirmarPaciente()}>
              Confirmar Paciente
            </button>
          </div>
        </>
      )}

      {isNew && <div>Form</div>}
      {!search && (
        <div className="agendamentosPaciente">
          <div className="btnBack">
            <button type="submit" onClick={() => cancelar()}>
              Voltar
            </button>
          </div>

          <AgendaDash pacienteid={pacienteSelect} />
        </div>
      )}
    </div>
  );
}
