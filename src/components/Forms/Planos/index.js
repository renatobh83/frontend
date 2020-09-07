import React from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import { useAgend } from "../Agendamento";

function Planos() {
  const { selPlano, plano, cancel } = useAgend();

  const getPlano = (e) => {
    plano(e.target.value);
  };

  return (
    <div className="planosContainer">
      <div className="buscaPlano">
        <input type="search" id="plano" placeholder="Procura" />
        <div className="icon">
          <FiSearch size={30} />
        </div>
      </div>
      <div className="planoList">
        <ul>
          <li>
            <input
              type="radio"
              id="radio-2-1"
              name="planos"
              value={"plano a"}
              onChange={getPlano}
              className="regular-radio"
            />
            <label htmlFor="radio-2-1">PLano A</label>
          </li>

          <li>
            <div className="button-holder">
              <input
                type="radio"
                id="radio-2-2"
                name="planos"
                value={"plano b"}
                onChange={getPlano}
                className="regular-radio "
              />
              <label htmlFor="radio-2-2">PLano A</label>
            </div>
          </li>
        </ul>
      </div>
      <div className="groupButtonsAg">
        <button type="submit" onClick={() => selPlano(true)}>
          Proximo
        </button>
        <button type="submit" className="danger" onClick={() => cancel(false)}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Planos;
