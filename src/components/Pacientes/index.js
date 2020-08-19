import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

import "./styles.css";
import Main from "../Main/";
import AgendaDash from "../AgendaDash";

export default function Pacientes() {
  const [paciente, SetPaciente] = useState(["Nome"]);
  const [search, setSearch] = useState(true);
  const [isNew, setNew] = useState(false);
  return (
    <div className="agendamentoContainer">
      {search && !isNew && (
        <>
          <div className="pesquisaPaciente">
            <div className="pesquisa">
              <h3>Paciente</h3>
              <form>
                <input type="search" name="paciente" id="" />
                <button className="btn">
                  <FiSearch size={30} />
                </button>
              </form>
            </div>
          </div>
          {paciente.length >= 1 && (
            <div className="listPatients">
              <ul>
                <li>
                  <div className="patientContent">
                    <label htmlFor="paci2">Nome paciente</label>
                    <input type="radio" name="paciente" id="paci2" />
                  </div>
                </li>
                <li>
                  <div className="patientContent">
                    <label htmlFor="paci3">Nome paciente</label>
                    <input type="radio" name="paciente" id="paci3" />
                  </div>
                </li>
                <li>
                  <div className="patientContent">
                    <label htmlFor="paci4">Nome paciente</label>
                    <input type="radio" name="paciente" id="paci4" />
                  </div>
                </li>
              </ul>
            </div>
          )}
          <div className="grupButtons">
            <button type="submit" onClick={() => setNew(!isNew)}>
              Novo Cadastro
            </button>
            <button type="submit" onClick={() => setSearch(!search)}>
              Confirmar Paciente
            </button>
          </div>
        </>
      )}

      {isNew && <div>Form</div>}
      {!search && (
        <div className="agendamentosPaciente">
          <div className="btnBack">
            <button type="submit" onClick={() => setSearch(!search)}>
              Voltar
            </button>
          </div>

          <AgendaDash />
        </div>
      )}
    </div>
  );
}
