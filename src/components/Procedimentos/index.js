import React, { useState, useEffect, createContext, useContext } from "react";
import "./styles.css";
import {
  getSetores,
  getExames,
  activeOrDeactive,
  deleteProcedimento,
} from "../../api/serviceAPI";
import ProcedimentosForm from "../Forms/Procedimentos/index";

import logoLoading from "../../assets/loading.svg";

export const ProcedimentoContext = createContext();
export const useContextProce = () => useContext(ProcedimentoContext);

export default function Procedimentos() {
  const [setores, setSetores] = useState([]);
  const [exames, setExames] = useState([]);
  const [newExame, setNewExame] = useState(false);
  const [setorFilter, setSetorFilter] = useState(null);
  const [setorSelect, setSetorSelect] = useState(null);
  const [loading, setLoading] = useState(true);

  //pegar setores
  const handleSetores = async () => {
    await getSetores().then((setor) => {
      setSetores(setor.data.message);
    });
  };
  const setNew = () => {
    setNewExame(false);
    setSetorSelect(null);
    setSetorFilter(null);
    handleProcedimento();
  };
  const setNewWithSetor = () => {
    if (setorSelect === null || setorSelect === undefined)
      return alert("Favor selecionar um setor");
    setNewExame(true);
  };
  // Filter Setor Change
  const selectSetorChange = (e) => {
    const setor = setores.find((s) => s._id === e);
    setSetorSelect(setor);
    setSetorFilter(e);
  };

  const desativarProcedimento = async (id, ativo) => {
    const data = {
      ativo: ativo.target.checked,
    };
    if (ativo.target.checked) {
      const ativar = exames.find((exame) => exame._id === id);
      ativar.ativo = true;
    } else {
      const desativar = exames.find((exame) => exame._id === id);
      desativar.ativo = false;
    }
    await activeOrDeactive(id, data);
  };

  const handleDeleteProcedimento = async (id) => {
    await deleteProcedimento(id);
    const filter = exames.filter((exame) => exame._id !== id);
    setExames(filter);
  };

  const handleProcedimento = async () => {
    await getExames().then((res) => {
      setExames(res.data.message);

      setLoading(false);
    });
  };
  const exibirProcedimento =
    !setorFilter || setorFilter === "#"
      ? exames
      : exames.filter((exame) => exame.setorId === setorFilter);

  useEffect(() => {
    handleProcedimento();
    handleSetores();
  }, []);
  if (loading) {
    return (
      <div className="loading">
        <img src={logoLoading} alt="loading" />
      </div>
    );
  }
  const config = {
    setNew,
    setorSelect,
  };
  return (
    <ProcedimentoContext.Provider value={config}>
      {!newExame && (
        <div className="procedimentosContainer">
          <div className="newProcedimento">
            <button onClick={() => setNewWithSetor()}>Novo exame</button>
          </div>
          <div className="selectSetor">
            <select
              name="setor"
              id="setor"
              onChange={(e) => selectSetorChange(e.target.value)}
            >
              <option value="">Setor...</option>
              {setores.map((setor) => (
                <option key={setor._id} value={setor._id}>
                  {setor.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="listProcedimento">
            <ul>
              {exibirProcedimento.map((exame) => (
                <li key={exame._id}>
                  <div className="procedimentoContent">
                    <h2>{exame.procedimento}</h2>
                    <div className="label">
                      <label htmlFor={exame._id}>Ativo</label>
                      <input
                        type="checkbox"
                        id={exame._id}
                        defaultChecked={exame.ativo}
                        onChange={(e) =>
                          desativarProcedimento(e.target.value, e)
                        }
                        value={exame._id}
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={() => handleDeleteProcedimento(exame._id)}
                    >
                      Apagar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {newExame && <ProcedimentosForm />}
    </ProcedimentoContext.Provider>
  );
}
