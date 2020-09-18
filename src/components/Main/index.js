import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FiCalendar } from "react-icons/fi";

import { useAuth0 } from "../../Auth0/context";
import "./styles.css";
import AgendaDash from "../AgendaDash";
import { report } from "../../api/serviceAPI";

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
  const [totalDia, setTotalDia] = useState(0);
  const [totalMes, setTotalMes] = useState(0);

  const fetchReport = useCallback(async () => {
    const response = await report();
    const totalDia = response.data.AgendamentoDia.find(
      (user) => user._id === state.responseAPI.message._id
    );
    const totalMes = response.data.AgendamentoFuncinarios.find(
      (user) => user._id === state.responseAPI.message._id
    );
    if (totalMes !== undefined) setTotalMes(totalMes.count);
    if (totalDia !== undefined) setTotalDia(totalDia.count);
  }, []); // eslint-disable-line
  useEffect(() => {
    fetchReport();
  }, []); // eslint-disable-line
  return (
    <div className="mainPrincipalContainer">
      <div className="mainCard">
        <div className="contentCard">
          <strong>{state.responseAPI.message.name}</strong>
          {totalMes !== 0 && (
            <>
              <p>{`Agendamentos Hoje ${totalDia}`}</p>
              <p>{`Agendamentos Mes ${totalMes}`}</p>
              <span>*Cancelamentos serão abatidos na contabilização</span>
            </>
          )}
        </div>
        <Link to="/agendar" className="contentCard">
          <h1>Agendar</h1>
          <FiCalendar size={109} />
        </Link>
      </div>
    </div>
  );
};
