import React, { useEffect } from "react";
import "./styles.css";
import { useAgend } from "../Agendamento";
import { getSalaFromSetor } from "../../../api/serviceAPI";
export default function Horarios() {
  const { examesFromChild, selPlano, setExame } = useAgend();

  const cancelar = () => {
    selPlano(true);
    setExame(false);
  };
  /* teste */
  const salaDoExame = (id) => {
    const sala = id.map(async (element) => {
      const response = await getSalaFromSetor(element.setorId);
      return response;
    });
    console.log(sala);
  };

  useEffect(() => {
    salaDoExame(examesFromChild);
  }, []); // eslint-disable-line
  /* Fim teste */
  return (
    <div className="horariosContainer">
      <div className="agendaExames">
        <strong>Exames</strong>

        <ul>
          {examesFromChild.map((exame) => (
            <li key={exame._id}>{exame.procedimento}</li>
          ))}
        </ul>
      </div>
      <div className="gridHorarios">
        <label htmlFor="horarioId">
          <input type="radio" name="horario" id="horarioId" />
          <div className="cardHorario">
            <div className="dados">
              <div className="day">Dia</div>
              <div className="intervalo">Intervalo</div>
            </div>
          </div>
        </label>
        <label htmlFor="horarioId2">
          <input type="radio" name="horario" id="horarioId2" />
          <div className="cardHorario">
            <div className="dados">
              <div className="day">Dia</div>
              <div className="intervalo">Intervalo</div>
            </div>
          </div>
        </label>
        <label htmlFor="horarioId3">
          <input type="radio" name="horario" id="horarioId3" />
          <div className="cardHorario">
            <div className="dados">
              <div className="day">Dia</div>
              <div className="intervalo">Intervalo</div>
            </div>
          </div>
        </label>
        <label htmlFor="horarioId4">
          <input type="radio" name="horario" id="horarioId4" />
          <div className="cardHorario">
            <div className="dados">
              <div className="day">Dia</div>
              <div className="intervalo">Intervalo</div>
            </div>
          </div>
        </label>
      </div>
      <div className="btnGroup">
        <button>Gravar</button>
        <button className="danger" onClick={() => cancelar()}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
