import React, { useState, createContext, useContext } from "react";

import "./styles.css";
import Planos from "../Planos";
import Exames from "../Exames";
import Horarios from "../Horarios";
import { useEffect } from "react";
export const AgendamentoContext = createContext();
export const useAgend = () => useContext(AgendamentoContext);

function Agendamento({ pacienteId, cancel }) {
  const [planoSelect, setPlanoSelect] = useState(false);

  const [exameisSelect, setExameSelect] = useState(false);
  const [planoFromchild, setPlano] = useState({});
  const [examesFromChild, setExames] = useState([]);
  const [exameTeste, setExameTeste] = useState({
    totalExames: 0,
    exame: [],
  });

  const planoSelecionado = (e) => {
    setPlano(e);
  };
  const exameSelecionado = (e) => {
    setExames(e);
  };

  useEffect(() => {
    if (examesFromChild.length > 0) {
      setExameTeste({
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
    exameTeste,
    pacienteId,
    cancel,
  };
  return (
    <AgendamentoContext.Provider value={configContext}>
      <div className="agendamentoContainer">
        <h1>Novo Agendamento</h1>
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
