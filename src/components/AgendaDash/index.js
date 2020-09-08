import React, { useState, useCallback, useEffect } from "react";
import Agendamento from "../Forms/Agendamento/index";

import "./styles.css";
import { useAuth0 } from "../../Auth0/context";
import {
  agendamentosPaciente,
  cancelaAgendamentoPaciente,
  updateHorarioSelecionado,
} from "../../api/serviceAPI";

import { differenceInDays, differenceInHours, addHours } from "date-fns";

export default function AgendaDash({ pacienteid }) {
  const { state } = useAuth0();
  const [newAgendamento, setAgendamento] = useState(false);
  const [pacienteAgendamentos, setpacienteAgendamentos] = useState([]);
  const pId = state.responseAPI.message.paciente
    ? state.responseAPI.message._id
    : pacienteid;

  const handleAgendamentos = useCallback(async () => {
    setpacienteAgendamentos([]);
    const today = new Date();
    await agendamentosPaciente(pId).then((res) => {
      if (res.data.message.length >= 1) {
        res.data.message[0].dados.forEach((a) => {
          const horaAgendamento = addHours(new Date(a.hora.time), 3);
          const diff = differenceInDays(today, horaAgendamento);
          const difHora = differenceInHours(today, horaAgendamento);
          const difMinu = differenceInHours(today, horaAgendamento);
          if (diff <= 0) {
            if (difHora <= -0 && difMinu <= -0) {
              setpacienteAgendamentos((oldValues) => [...oldValues, a]);
            }
          }
        });
      }
    });
  }, []); //eslint-disable-line

  const closeAgendamento = () => {
    setAgendamento(false);
    // handleAgendamentos();
  };
  const cancelaAgendamento = async (values) => {
    const data = {
      horarios: [values.id],
      ocupado: false,
    };
    const filter = pacienteAgendamentos.filter((a) => a.hora.id !== values.id);
    setpacienteAgendamentos(filter);
    await cancelaAgendamentoPaciente(values.id);
    await updateHorarioSelecionado(data);
  };
  useEffect(() => {
    handleAgendamentos();
  }, [newAgendamento]); //eslint-disable-line
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
              <>
                <div className="agenContent">
                  Data: {agenda.hora.data} <p>Hora: {agenda.hora.horaInicio}</p>
                  Exame: {agenda.exame.procedimento}
                  <p>
                    <button
                      type="submit"
                      onClick={() => cancelaAgendamento(agenda.hora)}
                    >
                      Cacenlar
                    </button>
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
      {newAgendamento && (
        <Agendamento pacienteId={pId} cancel={closeAgendamento} />
      )}
    </>
  );
}
