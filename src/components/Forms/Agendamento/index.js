import React, { useState, createContext, useContext } from "react";

import "./styles.css";
import Planos from "../PlanosAgendamento";
import Exames from "../Exames";
import Horarios from "../Horarios";
import { useEffect } from "react";
import { useAuth0 } from "../../../Auth0/context";
export const AgendamentoContext = createContext();
export const useAgend = () => useContext(AgendamentoContext);

function Agendamento({ pacienteId, cancel }) {
  const { state } = useAuth0();
  const [planoSelect, setPlanoSelect] = useState(false);
  const [exameisSelect, setExameSelect] = useState(false);
  const [planoFromchild, setPlano] = useState({});
  const [examesFromChild, setExames] = useState([]);
  const [totalExames, setTotalExames] = useState(0);
  const [isParticular, setIsParticular] = useState(false);

  const [examesAgendamento, setExamesAgendamento] = useState({
    totalExames: 0,
    exame: [],
  });

  const agent = state.responseAPI.message.paciente
    ? "Web"
    : state.responseAPI.message._id;
  const planoSelecionado = (e) => {
    setPlano(e);
  };
  const exameSelecionado = (e, total, particular) => {
    setTotalExames(total);
    setIsParticular(particular);
    setExames(e);
  };
  // const planos

  useEffect(() => {
    if (examesFromChild.length > 0) {
      setExamesAgendamento({
        totalExames: examesFromChild.length,
        exame: examesFromChild,
      });
    }
  }, [examesFromChild]);
  const submit = (e) => {
    e.preventDefault();
  };

  const configContext = {
    selPlano: (...p) => setPlanoSelect(...p),
    setExame: (...p) => setExameSelect(...p),
    plano: (...p) => planoSelecionado(...p),
    exame: (...p) => exameSelecionado(...p),
    planoFromchild,
    examesFromChild,
    examesAgendamento,
    pacienteId,
    cancel,
    agent,
    totalExames,
    isParticular,
  };
  return (
    <AgendamentoContext.Provider value={configContext}>
      <div className="agendamentoContainer">
        <form className="agendamentoForm" onSubmit={(e) => submit(e)}>
          {!planoSelect && <Planos />}
          {!exameisSelect && planoSelect && <Exames />}
          {exameisSelect && planoSelect && <Horarios />}
        </form>
      </div>
    </AgendamentoContext.Provider>
  );
}

export default Agendamento;
