import React, { useState, useEffect, useCallback } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import "./styles.css";
import { useAgend } from "../Agendamento";
import { getExamesAgendamento } from "../../../api/serviceAPI";

export default function Exames() {
  const { setExame, exame, selPlano } = useAgend();

  const [searchItem, setSearchItem] = useState(null);
  const [exames] = useState([]);
  const [examesSelecionado, setSelecaoExames] = useState([]);
  const [Ex, setEx] = useState([]);

  const fetchExames = useCallback(async () => {
    await getExamesAgendamento().then((res) => {
      setEx(res.data.message);
    });
  }, []);

  const insertExame = (e, x) => {
    if (x.target.checked) {
      setSelecaoExames([...examesSelecionado, e]);
      const filterES = Ex.filter(
        (exame) => exame.procedimento !== e.procedimento
      );
      setEx(filterES);
    } else {
      deleteExame(e);
    }
  };
  const getExame = (e) => {
    exame(e);
  };
  // const updateState = (element, attr) => {
  //   const att = { check: attr };
  //   var index = Ex.findIndex((e) => e.procedimento === element.procedimento);
  //   if (index === -1) {
  //   } else {
  //     setEx([
  //       ...Ex.slice(0, index),
  //       Object.assign({}, Ex[index], att),
  //       ...Ex.slice(index + 1),
  //     ]);
  //   }
  // };
  // change exame
  const handleChange = (e) => {
    examesSelecionado.filter((exame) =>
      exame.procedimento
        .toLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );

    setSearchItem(e.target.value);
  };

  // Apagar exame
  const deleteExame = (e) => {
    const newArray = examesSelecionado.filter(
      (exame) => exame.procedimento !== e.procedimento
    );
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
    : Ex.filter((exame) =>
        exame.procedimento
          .toLowerCase()
          .includes(searchItem.toLocaleLowerCase())
      );

  getExame(examesSelecionado);
  useEffect(() => {
    fetchExames();
  }, [exames]); //eslint-disable-line
  return (
    <div className="examesContainer">
      <div className="buscarExame">
        <input
          type="search"
          value={searchItem}
          placeholder="Procura"
          onChange={handleChange}
        />
        <div className="icon">
          <FiSearch size={30} />
        </div>
      </div>
      <div className="listExames">
        <ul>
          {result.map((exame) => (
            <li key={exame._id}>
              <label htmlFor={exame.procedimento}>
                <input
                  type="checkbox"
                  id={exame.procedimento}
                  name="exames"
                  className="exames-check"
                  value={exame.procedimento}
                  onClick={(e) => insertExame(exame, e)}
                />
                {exame.procedimento}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {examesSelecionado.length > 0 && (
        <div className="examesSelecionados">
          {examesSelecionado.map((exame) => (
            <div className="examesSelect" key={exame.procedimento}>
              <div className="delete">
                <button>
                  <FiTrash2
                    size={15}
                    color={"red"}
                    onClick={() => deleteExame(exame)}
                  />
                </button>
              </div>
              <div className="content">
                {exame.procedimento} {exame.valor && ` - R$${exame.valor}`}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="btn">
        <button type="submit" onClick={() => setExame(true)}>
          Next
        </button>
        <button className="danger" onClick={() => cancelar()}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
