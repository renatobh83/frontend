import React, { useState } from "react";
import { useHorarioConext } from "../../components/Horarios";
import InputMask from "react-input-mask";
export default function HorariosGerar() {
  const { salas } = useHorarioConext();
  const [dias, setDias] = useState([
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sab",
  ]);
  return (
    <div className="gerarHorariosContainer">
      <form>
        <div className="selectForm">
          <select name="sala" id="sala">
            <option value="">Selecionar sala</option>
            {salas.map((sala) => (
              <option>{sala.nome}</option>
            ))}
          </select>
          <div className="diasForm">
            <ul>
              {dias.map((dia, key) => (
                <li key={key}>
                  <label htmlFor={key}>
                    {dia}
                    <input type="checkbox" name={dia} id={key} />
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="intervalo">
            <div className="tempo">
              <span>Inicio</span>
              <InputMask mask="99:99" maskPlaceholder="-" />
            </div>
            <div className="tempo">
              <span>Fim</span>
              <InputMask mask="99:99" maskPlaceholder="-" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
