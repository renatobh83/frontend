import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FiCalendar } from "react-icons/fi";

import { useAuth0 } from "../../Auth0/context";
import Agendamento from "../Forms/Agendamento";
import "./styles.css";
import AgendaDash from "../AgendaDash";

function Main() {
  const { isAuthenticated, state } = useAuth0();
  if (isAuthenticated) {
    if (state.responseAPI.message.paciente) {
      return <MainPaciente />;
    } else {
      return <MainPrincipal />;
    }
  }
}

export default Main;
const MainPaciente = () => {
  return <AgendaDash />;
};

const MainPrincipal = () => {
  const { state } = useAuth0();
  return (
    <div className="mainPrincipalContainer">
      <div className="mainCard">
        <div className="contentCard">
          <strong>{state.responseAPI.message.nome}</strong>
        </div>
        <Link to="/agendar" className="contentCard">
          <h1>Agendar</h1>
          <FiCalendar size={109} />
        </Link>
      </div>
    </div>
  );
};
