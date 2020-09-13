import React, { useEffect, useState, useCallback } from "react";

import "./styles.css";
import {
  getplanos,
  getTabelas,
  storePlano,
  updatePlano,
} from "../../api/serviceAPI";
export default function Planos() {
  const [newPlan, setNewPlan] = useState(false);
  const [plano, setPlano] = useState(null);

  const editar = (e) => {
    setNewPlan(true);
    setPlano(e);
  };
  const close = () => {
    setNewPlan(!newPlan);
    setPlano(null);
  };
  return (
    <div className="plansContainer">
      <div className="btnNewPlan">
        <button
          type="submit"
          onClick={() => close()}
          className={newPlan ? "danger" : ""}
        >
          {!newPlan ? "Novo Plano" : "Cancelar"}
        </button>
      </div>
      {!newPlan && (
        <div className="listOfPlans">
          <ListPlanos editar={editar} />
        </div>
      )}
      {newPlan && (
        <div className="formPlans">
          <FormPlanos close={close} plano={plano} setPlano={setPlano} />
        </div>
      )}
    </div>
  );
}
const ListPlanos = ({ editar }) => {
  const [plans, setPlans] = useState([]);

  const editarPlano = (id) => {
    const plano = plans.find((i) => i._id === id);
    editar(plano);
  };

  const fetchPlanos = useCallback(() => {
    getplanos().then((res) => setPlans(res.data.message));
  }, []);
  useEffect(() => {
    fetchPlanos();
  }, [fetchPlanos]);
  return (
    <>
      <ul>
        {plans.map((plano) => (
          <li className="listPlano">
            <div className="planoContent">
              <strong>{plano.descricao}</strong>
              <button type="submit" onClick={() => editarPlano(plano._id)}>
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const FormPlanos = ({ close, plano }) => {
  const [tabelas, setTabelas] = useState([]);
  const [tabela, setTabela] = useState("");
  const [ativo, setAtivo] = useState("");
  const [particular, setParticular] = useState(false);
  const [nome, setNome] = useState("");
  const [tableEdit, setTableEdit] = useState(null);

  const handleTabelas = useCallback(async () => {
    await getTabelas().then((res) => {
      setTabelas(res.data.message);
      if (plano) defaultSelectTabel(plano, res.data.message);
    });
  }, []); // eslint-disable-line

  const handleGravar = async (e) => {
    e.preventDefault();
    const data = {
      tabela,
      descricao: nome,
      particular,
    };
    if (plano) {
      await updatePlano(plano._id, data).then((response) => {
        if (response.data.statusCode === 400) {
          alert(response.data.message);
        }
      });
    } else {
      await storePlano(data).then((response) => {
        if (response.data.statusCode === 400) {
          alert(response.data.message);
        }
      });
    }

    close();
  };

  const defaultSelectTabel = (e, tb) => {
    const tabelaEdit = tb.find((t) => t._id === e.tabela);

    setTableEdit(tabelaEdit._id);
  };
  const handleEditPlano = (e) => {
    if (e !== null) {
      setNome(e.descricao);
      setParticular(e.particular);
      setTabela(e.tabela);
    }
  };

  useEffect(() => {
    handleTabelas();
    handleEditPlano(plano);
  }, []); // eslint-disable-line

  return (
    <>
      <form onSubmit={handleGravar}>
        <label htmlFor="ativo" className="ativo">
          <input
            type="checkbox"
            name="ativo"
            id="ativo"
            defaultChecked
            className="input"
            onChange={(e) => setAtivo(e.target.checked)}
          />
          Ativo
        </label>
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
        <div className="divGroup">
          <select
            name="tabela"
            id="tabela"
            required
            onChange={(e) => setTabela(e.target.value)}
          >
            <option value="">Tabela de procedimentos</option>
            {tabelas.map((tabela) => (
              <option
                key={tabela._id}
                value={tabela._id}
                selected={tabela._id === tableEdit}
              >
                {tabela.nome}
              </option>
            ))}
          </select>
          <label htmlFor="particular">
            <input
              type="checkbox"
              name="particular"
              id="particular"
              defaultChecked={particular}
              onChange={(e) => setParticular(e.target.checked)}
            />
            Particular
          </label>
        </div>
        <button type="submit">Gravar</button>
      </form>
    </>
  );
};
