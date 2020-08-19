import React, { useState } from "react";
import Agendamento from "../Forms/Agendamento/index";

import "./styles.css";
export default function AgendaDash() {
  const [newAgendamento, setAgendamento] = useState(false);
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
          <strong>Agendamentos </strong>
          <div className="content">
            <div className="agenContent">
              Data: 10/10/2020 <p>Exame: Us mama</p> Medico: X
            </div>
            <div className="agenContent">
              Data: 10/10/2020 <p>Exame: Us mama</p> Medico: X
            </div>
            <div className="agenContent">
              Data: 10/10/2020 <p>Exame: Us mama</p> Medico: X
            </div>
            <div className="agenContent">
              Data: 10/10/2020 <p>Exame: Us mama</p> Medico: X
            </div>
            <div className="agenContent">
              Data: 10/10/2020 <p>Exame: Us mama</p> Medico: X
            </div>
          </div>
        </div>
      )}
      {newAgendamento && <Agendamento />}
    </>
  );
}
