import React, { useState, useCallback, useEffect } from "react";
import Agendamento from "../Forms/Agendamento/index";

import "./styles.css";
import { useAuth0 } from "../../Auth0/context";
import { agendamentosPaciente } from "../../api/serviceAPI";

import { differenceInDays, differenceInHours } from "date-fns";

export default function AgendaDash({ pacienteid }) {
  const { state } = useAuth0();
  const [newAgendamento, setAgendamento] = useState(false);
  const [pacienteAgendamentos, setpacienteAgendamentos] = useState([]);
  const pId = state.responseAPI.message.paciente
    ? state.responseAPI.message._id
    : pacienteid;

  const handleAgendamentos = useCallback(async () => {
    const today = new Date();
    await agendamentosPaciente(pId).then((res) => {
      res.data.message[0].dados.forEach((a) => {
        const diff = differenceInDays(today, new Date(a.hora.time));
        const difHora = differenceInHours(today, new Date(a.hora.time));
        const difMinu = differenceInHours(today, new Date(a.hora.time));
        console.log(difHora, difMinu);
        if (diff <= 0) {
          if (difHora <= -0 && difMinu < 0) {
            setpacienteAgendamentos((oldValues) => [...oldValues, a]);
          }
        }
      });
    });
  }, []); //eslint-disable-line
  useEffect(() => {
    console.log(newAgendamento);
    handleAgendamentos();
  }, []); //eslint-disable-line
  return (
    <>
      {!newAgendamento && (
        <div className="mainContainer">
          <header className="novoAgendamento">
            <button
              type="submit"
              onClick={() => setAgendamento(!newAgendamento)}
            >
              Novo agendamento
            </button>
          </header>
          <strong>Agendamentos futuros</strong>
          <div className="content">
            {pacienteAgendamentos.map((agenda) => (
              <div className="agenContent">
                Data: {agenda.hora.data} <p>Hora: {agenda.hora.horaInicio}</p>
                Exame: {agenda.exame.procedimento}
              </div>
            ))}
          </div>
        </div>
      )}
      {newAgendamento && (
        <Agendamento pacienteId={pId} cancel={setAgendamento} />
      )}
    </>
  );
}
