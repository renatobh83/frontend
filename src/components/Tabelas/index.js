import React, { useState } from "react";
import "./styles.css";
import { useCallback } from "react";
import CurrencyInput from "react-currency-input";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import {
  getExamesAgendamento,
  updateTabela,
  getTabelas,
  storeTabela,
} from "../../api/serviceAPI";
import { useEffect } from "react";
import { moeda } from "../../Utils/formatMoney";

export default function Tabelas() {
  const [newTable, setNewTable] = useState(false);

  return (
    <div className="tabelasContainer">
      <div className="btnNewTable">
        <button
          type="submit"
          onClick={() => setNewTable(!newTable)}
          className={newTable ? "danger" : ""}
        >
          {!newTable ? "Nova tabela" : "Cancelar"}
        </button>
      </div>
      {!newTable && (
        <div className="listOfTables">
          <ListOfTables />
        </div>
      )}
      {newTable && (
        <div className="formTables">
          <FormTabelas close={setNewTable} />
        </div>
      )}
    </div>
  );
}
const ListOfTables = () => {
  const [tabelas, setTabelas] = useState([]);
  const [insertExames, setInsertExames] = useState(false);
  const [tabelaSelect, setTabelaSelect] = useState(null);
  const [dateTable, setDateTable] = useState("");

  const handleTables = useCallback(async () => {
    await getTabelas().then((res) => {
      setTabelas(res.data.message);
    });
  }, []);

  const tabela = (ev) => {
    const find = tabelas.filter((e) => e._id === ev);
    console.log(find);
    setDateTable(find);
  };
  const onchangeTable = (e) => {
    setTabelaSelect(e);
    tabela(e);
  };
  const closeInsertExames = () => {
    setInsertExames(false);
    setTabelaSelect(null);
    handleTables();
  };
  const insertValueIntable = () => {
    if (tabelaSelect === null || tabelaSelect === "")
      return alert("selecione uma tabela");
    setInsertExames(true);
  };
  useEffect(() => {
    handleTables();
  }, []); // eslint-disable-line
  return (
    <>
      {tabelas.length >= 1 && !insertExames && (
        <>
          <div className="init">
            <select
              name="tabela"
              onChange={(e) => onchangeTable(e.target.value)}
            >
              <option value="">Selecione uma tabela</option>
              {tabelas.map((tabela) => (
                <option key={tabela._id} value={tabela._id}>
                  {tabela.nome}
                </option>
              ))}
            </select>
            <div className="tables">
              <button type="submit" onClick={() => insertValueIntable()}>
                Inserir/Editar
              </button>
            </div>
          </div>
          <div className="header">
            <span>Exame</span>
            <span>Valor</span>
          </div>
          {tabelaSelect !== null && tabelaSelect !== "" && (
            <>
              {dateTable.map((t) =>
                t.exames.map((ex) => (
                  <div className="tableProcContent" key={ex.exame._id}>
                    <span>{ex.exame.procedimento}</span>
                    <span>{moeda(ex.valor)}</span>
                  </div>
                ))
              )}
            </>
          )}
        </>
      )}
      {insertExames && (
        <InsertExames tabela={dateTable} close={closeInsertExames} />
      )}
    </>
  );
};
// Inserir uma nova tabela
const FormTabelas = ({ close }) => {
  const [nome, setNome] = useState("");
  const handleSubmit = async (e) => {
    const data = {
      nome: nome,
    };
    e.preventDefault();
    await storeTabela(data).then(() => close(false));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="floating-label-input">
          <input
            type="text"
            id="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label htmlFor="nome">Nome</label>
          <span className="line"></span>
        </div>
        <button type="submit">Gravar</button>
      </form>
    </>
  );
};
// inserir exames/valores na tabela
const InsertExames = ({ tabela, close }) => {
  const [searchItem, setSearchItem] = useState(null);
  const [exames, setExames] = useState([]);
  const [examesSelecionado, setSelecaoExames] = useState([]);

  // get Exames cadastrados
  const handleExames = useCallback(async () => {
    await getExamesAgendamento().then((res) => {
      selectInitialExames(res.data.message);
    });
  }, []); // eslint-disable-line

  // select exames in ul
  const handleChange = (e) => {
    examesSelecionado.filter((exame) =>
      exame.procedimento
        .toLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );
    setSearchItem(e.target.value);
  };
  // insert /delete exame selecionado
  const insertExame = (e, x) => {
    if (x.target.checked) {
      setSelecaoExames([...examesSelecionado, { exame: e, valor: null }]);
      const filterES = exames.filter(
        (exame) => exame.procedimento !== e.procedimento
      );
      setExames(filterES);
    } else {
      deleteExame(e);
    }
  };
  //delete function
  const deleteExame = (e) => {
    const newArray = examesSelecionado.filter(
      (ex) => ex.exame.procedimento !== e.exame.procedimento
    );
    setExames([...exames, e.exame]);
    setSelecaoExames(newArray);
  };
  // function first ** not used
  // function comparer(otherArray) {
  //   return function (current) {
  //     return (
  //       otherArray.filter(function (other) {
  //         return other._id === current._id;
  //       }).length === 0
  //     );
  //   };
  // }

  const selectInitialExames = (e) => {
    setSelecaoExames(tabela[0].exames);
    const getExames = tabela[0].exames.map((e) => e.exame);
    const myArrayFiltered = e.filter((el) => {
      return !getExames.some((f) => {
        return f._id === el._id;
      });
    });
    setExames(getExames.length === 0 ? e : myArrayFiltered);
  };

  // array exames in filter
  const result = !searchItem
    ? exames
    : exames.filter((exame) =>
        exame.procedimento
          .toLowerCase()
          .includes(searchItem.toLocaleLowerCase())
      );
  // gravar preco exame in banco
  const handleChangeInput = (e, index) => {
    examesSelecionado[index].valor = e.target.value;
  };
  const handleGravar = async (e) => {
    await updateTabela(tabela[0]._id, examesSelecionado);
    close();
  };

  useEffect(() => {
    handleExames();
  }, []); // eslint-disable-line

  return (
    <>
      <h1>Exame</h1>
      <div className="buscarExame">
        <input
          type="search"
          defaultValue={searchItem}
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
                  defaultValue={exame.procedimento}
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
          {examesSelecionado.map((exame, index) => (
            <div className="examesSelect" key={index}>
              <div className="delete">
                <button>
                  <FiTrash2
                    size={15}
                    color={"red"}
                    onClick={() => deleteExame(exame)}
                  />
                </button>
              </div>
              <div className="contentExamInTable">
                <span> {exame.exame.procedimento}</span>
                <input
                  type="text"
                  id="valor"
                  inputMode="numeric"
                  defaultValue={examesSelecionado[index].valor}
                  placeholder="Valor"
                  onChange={(e) => handleChangeInput(e, index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="bntInputGrup">
        <button type="submit" onClick={() => handleGravar()}>
          Gravar
        </button>
        <button type="submit" className="danger" onClick={() => close()}>
          Cancelar
        </button>
      </div>
    </>
  );
};
