import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  getSetores,
  getExames,
  activeOrDeactive,
  deleteProcedimento,
} from "../../api/serviceAPI";
import ProcedimentosForm from "../Forms/Procedimentos/index";

export default function Procedimentos() {
  const [setores, setSetores] = useState([]);
  const [exames, setExames] = useState([]);
  const [newExame, setNewExame] = useState(false);
  const [setorId, setSetorId] = useState(null);
  const [setorFilter, setSetorFilter] = useState(null);
  //pegar setores
  const handleSetores = async () => {
    await getSetores().then((setor) => setSetores(setor.data.message));
  };
  const setNew = () => {
    setNewExame(!newExame);
    setSetorId(null);
    setSetorFilter(null);
    handleProcedimento();
  };
  const setNewWithSetor = () => {
    if (setorId === null) return alert("Favor selecionar um setor");
    setNewExame(true);
  };
  // Filter Setor Change
  const selectSetorChange = (e) => {
    setSetorFilter(e);
    setSetorId(e);
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

  const handleProcedimento = async () => {
    await getExames().then((res) => {
      setExames(res.data.message);
    });
  };

  const handleDeleteProcedimento = async (id) => {
    await deleteProcedimento(id);
    const filter = exames.filter((exame) => exame._id !== id);
    setExames(filter);
  };
  const exibirProcedimento =
    !setorFilter || setorFilter === "#"
      ? exames
      : exames.filter((exame) => exame.setorId === setorFilter);
  useEffect(() => {
    handleProcedimento();
    handleSetores();
  }, []);
  return (
    <>
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
      {newExame && <ProcedimentosForm set={setNew} setor={setorId} />}
    </>
  );
}
