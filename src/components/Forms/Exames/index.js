import React, { useState, useEffect, useCallback } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import "./styles.css";
import { useAgend } from "../Agendamento";
import { getExamesFromPlanos } from "../../../api/serviceAPI";
import logoLoading from "../../../assets/loading.svg";
import { moeda } from "../../../Utils/formatMoney";

export default function Exames() {
  const { setExame, exame, selPlano, planoFromchild } = useAgend();
  const [isloading, setIsloading] = useState(true);
  const [searchItem, setSearchItem] = useState(null);
  const [particular, setParticular] = useState(false);
  const [exames] = useState([]);
  const [examesSelecionado, setSelecaoExames] = useState([]);
  const [Ex, setEx] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchExames = useCallback(async () => {
    await getExamesFromPlanos(planoFromchild).then((res) => {
      setEx(res.data.message[0].ex.exames);
      setParticular(res.data.message[0].particular);
    });
    setIsloading(false);
  }, [planoFromchild]);

  const insertExame = (e, x) => {
    if (x.target.checked) {
      setSelecaoExames([...examesSelecionado, e]);
      setTotal(total + parseFloat(e.valor));
      const filterES = Ex.filter(
        (ex) => ex.exame.procedimento !== e.exame.procedimento
      );

      setEx(filterES);
    } else {
      deleteExame(e);
    }
  };

  const getExame = (e) => {
    exame(e, total, particular);
  };

  // Apagar exame
  const deleteExame = (e) => {
    const newArray = examesSelecionado.filter(
      (ex) => ex.exame.procedimento !== e.exame.procedimento
    );
    setTotal(total - parseFloat(e.valor));
    setEx([...Ex, e]);
    setSelecaoExames(newArray);
  };

  // Cancelar selecao de exame
  const cancelar = () => {
    selPlano(false);
    setExame(false);
  };

  // filter exame
  const result = !searchItem
    ? Ex
    : Ex.filter((ex) =>
        ex.exame.procedimento
          .toLowerCase()
          .includes(searchItem.toLocaleLowerCase())
      );

  getExame(examesSelecionado);

  useEffect(() => {
    fetchExames();
  }, [exames]); //eslint-disable-line
  if (isloading) {
    return (
      <div className="loading">
        <img src={logoLoading} alt="loading" />
      </div>
    );
  }
  return (
    <div className="examesContainer">
      <h1>Exame</h1>
      <div className="buscarExame">
        <input
          type="search"
          value={searchItem}
          placeholder="Procura"
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <div className="icon">
          <FiSearch size={30} />
        </div>
      </div>
      <div className="listExames">
        <ul>
          {result.map((ex) => (
            <li key={ex.exame._id}>
              <label htmlFor={ex.exame.procedimento}>
                <input
                  type="checkbox"
                  id={ex.exame.procedimento}
                  name="exames"
                  className="exames-check"
                  value={ex.exame.procedimento}
                  onClick={(e) => insertExame(ex, e)}
                />
                {ex.exame.procedimento}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {examesSelecionado.length > 0 && (
        <div className="examesSelecionados">
          {examesSelecionado.map((ex) => (
            <div className="examesSelect" key={ex.exame.procedimento}>
              <div className="delete">
                <button>
                  <FiTrash2
                    size={15}
                    color={"red"}
                    onClick={() => deleteExame(ex)}
                  />
                </button>
              </div>
              <div className="content">
                {ex.exame.procedimento} {particular && ` - ${moeda(ex.valor)}`}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="btn">
        {examesSelecionado.length > 0 && (
          <button type="submit" onClick={() => setExame(true)}>
            Selecionar horario
          </button>
        )}
        <button className="danger" onClick={() => cancelar()}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
