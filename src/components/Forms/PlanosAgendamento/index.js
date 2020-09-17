import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useAgend } from "../Agendamento";

import "./styles.css";
import logoLoading from "../../../assets/loading.svg";
import { getplanosAgendamento } from "../../../api/serviceAPI";
function Planos() {
  const { selPlano, plano, cancel } = useAgend();
  const [isloading, setIsloading] = useState(true);
  const [planos, setPlanos] = useState([]);
  const [searchPlano, setSearchPlano] = useState(null);
  // pegar plano selecionado
  const getPlano = (e) => {
    plano(e.target.value);
  };

  const handlePlanos = useCallback(async () => {
    try {
      await getplanosAgendamento().then((res) => {
        setIsloading(false);
        setPlanos(res.data.message);
      });
    } catch (error) {}
  }, []); // eslint-disable-line
  useEffect(() => {
    handlePlanos();
  }, [handlePlanos]);
  const result = !searchPlano
    ? planos
    : planos.filter((exame) =>
        exame.descricao.toLowerCase().includes(searchPlano.toLocaleLowerCase())
      );

  if (isloading) {
    return (
      <div className="loading">
        <img src={logoLoading} alt="loading" />
      </div>
    );
  }
  return (
    <div className="planosContainer">
      <h1>Plano</h1>
      <div className="buscaPlano">
        <input
          type="search"
          id="plano"
          placeholder="Procura"
          onChange={(e) => setSearchPlano(e.target.value)}
        />
        <div className="icon">
          <FiSearch size={30} />
        </div>
      </div>
      <div className="planoList">
        <ul>
          {result.map((plano) => (
            <li key={plano._id}>
              <div className="button-holder">
                <input
                  type="radio"
                  id={plano._id}
                  name="planos"
                  value={plano._id}
                  onChange={getPlano}
                  className="regular-radio "
                />
                <label htmlFor={plano._id}>{plano.descricao}</label>
              </div>
            </li>
          ))}
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
