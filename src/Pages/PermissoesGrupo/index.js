import React, { useState, useEffect } from "react";
import { useGrupoContext } from "../../components/Grupos";

import "./styles.css";
import { getPermissoes, setPermissoes } from "../../api/serviceAPI";
import logoLoading from "../../assets/loading.svg";

export default function PermissoesGrupo() {
  const { permissionShow, grupoSelect } = useGrupoContext();

  const [permissoes, setPermissao] = useState([]);
  const [permissaoCheck, setChecked] = useState([]);
  const [permissaoLiberada, setPermissaoLiberada] = useState([]);
  const [permissaoRemover, setRemoverPermissao] = useState([]);

  const [loading, setLoading] = useState(true);
  // Carrega as permissoes
  const handlePermissao = async () => {
    await getPermissoes().then((res) => {
      handlePermissoesGrupo(res.data.message);
      setLoading(false);
    });
  };

  // fechar component
  const handleClose = () => {
    permissionShow(false);
  };
  // pegar checkbox selecionado
  const handleSelect = async (e) => {
    const options = permissaoCheck;
    let index;
    if (e.target.checked) {
      options.push(e.target.value);
    } else {
      index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }

    setChecked(options);
  };

  // remover permissao
  const handleRemovePermission = async (e) => {
    const options = permissaoRemover;
    let index;
    if (e.target.checked) {
      options.push(e.target.value);
    } else {
      index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }
    setRemoverPermissao(options);
  };

  // pegar permissoes do grupo
  const handlePermissoesGrupo = async (p) => {
    const grupoPermissoes = grupoSelect.grupo.permissaoId;
    const permissaoCadastrada = [];
    if (grupoPermissoes.length !== 0) {
      for (let i = 0; i < grupoPermissoes.length; i++) {
        const permissao = p.find(
          (permissoes) => permissoes._id === grupoPermissoes[i]
        );
        permissaoCadastrada.push(permissao);
      }
    }
    setPermissaoLiberada(permissaoCadastrada);
    const permissaoNaoAssociada = p.filter(
      (id) => !permissaoCadastrada.includes(id)
    );
    setPermissao(permissaoNaoAssociada);
  };

  // gravar permisso no grupo
  const handleGravar = async (e) => {
    e.preventDefault();
    const getId = permissaoLiberada.map((p) => p._id);
    const concatArray = permissaoCheck.concat(getId);
    const checkedPermissao = concatArray.filter(
      (check) => !permissaoRemover.includes(check)
    );
    const data = {
      grupo: grupoSelect.grupo,
      checkedPermissao,
    };

    await setPermissoes(data);
    handleClose();
  };

  useEffect(() => {
    handlePermissao();
  }, []); // eslint-disable-line
  if (loading) {
    return (
      <div className="loading">
        <img src={logoLoading} alt="loading" />
      </div>
    );
  }
  return (
    <div className="pgContainer">
      <strong>{grupoSelect.grupo.nome}</strong>
      <div className="permissoesList">
        {permissoes.length >= 1 && (
          <div className="permissoesDisponiveis">
            <h1>Permissoes Disponiveis</h1>
            <div className="listPermiss">
              {permissoes.map((permissao) => (
                <div className="permissoes" key={permissao._id}>
                  <label htmlFor={permissao.nome}>{permissao.nome}</label>
                  <input
                    type="checkbox"
                    value={permissao._id}
                    onChange={(e) => handleSelect(e)}
                    id={permissao.nome}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {permissaoLiberada.length >= 1 && (
          <div className="permissoesLiberadas">
            <h1>Permissoes Liberadas</h1>
            <div className="listPermiss">
              {permissaoLiberada.map((permissao) => (
                <div className="permissoes">
                  <label htmlFor={permissao.nome}>{permissao.nome}</label>
                  <input
                    type="checkbox"
                    name={permissao.nome}
                    value={permissao._id}
                    id={permissao.nome}
                    onChange={(e) => handleRemovePermission(e)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="grupButtons">
        <button type="submit" onClick={handleGravar}>
          Gravar
        </button>
        <button type="submit" onClick={() => handleClose()}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
