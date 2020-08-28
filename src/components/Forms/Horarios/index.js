import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAgend } from "../Agendamento";
import { getHorariosBySetor } from "../../../api/serviceAPI";
import { getHours } from "../../../Utils/getHours";
export default function Horarios() {
  const { examesFromChild, selPlano, setExame } = useAgend();
  const [horariosDisponivel, setHorariosDisponivel] = useState([]);
  const cancelar = () => {
    selPlano(true);
    setExame(false);
  };
  /* teste */
  const horariosLivres = (exame) => {
    exame.forEach(async (id) => {
      await getHorariosBySetor(id.setorId).then((res) => {
        getHours(res.data.message, (value) => {
          setHorariosDisponivel((oldvalues) => [...oldvalues, value].sort());
        });
      });
    });
  };

  useEffect(() => {
    horariosLivres(examesFromChild);
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
        {horariosDisponivel.map((horario) => (
          <label htmlFor={horario.id}>
            <input type="radio" name="horario" id={horario.id} />
            <div className="cardHorario">
              <div className="dados">
                <div className="day">{horario.data}</div>
                <div className="intervalo">{horario.horaInicio}</div>
              </div>
            </div>
          </label>
        ))}
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
