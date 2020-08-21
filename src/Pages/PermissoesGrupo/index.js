import React, { useState, useEffect } from "react";
import { useGrupoContext } from "../../components/Grupos";

export default function PermissoesGrupo() {
  const { grupoNew } = useGrupoContext();

  const [loading, setLoading] = useState(true);
  const [permissoes, setPermissao] = useState([]);
  const [permissaoCheck, setChecked] = useState([]);
  const [permissaoLiberada, setPermissaoLiberada] = useState([]);
  const [permissaoRemover, setRemoverPermissao] = useState([]);

  // Carrega as permissoes
  const handlePermissao = async () => {
    // await getPermissoes().then((res) => {
    //   handlePermissoesGrupo(res.data.message);
    //   setLoading(false);
    // });
  };

  // fechar component
  const handleClose = () => {
    // fechar();
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
    // const grupo = await findGrupoById(isOpen.grupo);
    // const grupoPermissoes = grupo.data.message.permissaoId;
    const permissaoCadastrada = [];
    // if (grupoPermissoes.length !== 0) {
    //   for (let i = 0; i < grupoPermissoes.length; i++) {
    //     const permissao = p.find(
    //       (permissoes) => permissoes._id === grupoPermissoes[i]
    //     );
    //     permissaoCadastrada.push(permissao);
    //   }
    // }
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
      //   grupo,
      //   checkedPermissao,
    };
    // await setPermissoes(data);
    handleClose();
  };

  useEffect(() => {
    handlePermissao();
  }, []); // eslint-disable-line

  //   if (loading) {
  //     return (
  //       <div className="loading">
  //         {/* <img src={logoLoading} alt="loading" /> */}
  //       </div>
  //     );
  //   }

  return (
    <>
      {/* <h3 className="text-center">{isOpen.nomeGrupo}</h3> */}
      <div className="row">
        <form className="ml-4 col">
          <strong className="d-block m-3">Permissoes para o grupo </strong>
          <div>
            {permissoes.map((permissao, key) => (
              <label className="d-flex" key={permissao._id}>
                {permissao.nome}
                <input
                  type="checkbox"
                  name={permissao.nome}
                  value={permissao._id}
                  onChange={(e) => handleSelect(e)}
                />
              </label>
            ))}
          </div>
        </form>
        <div className="col">
          <strong className="d-block m-3">Permissoes liberadas</strong>
          {permissaoLiberada.map((permissao) => (
            <label className="d-flex" key={permissao._id}>
              {permissao.nome}
              <input
                type="checkbox"
                name={permissao.nome}
                value={permissao._id}
                onChange={(e) => handleRemovePermission(e)}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="col">
        <button
          className="d-block w-100 btn btn-primary"
          onClick={handleGravar}
        >
          Gravar
        </button>
      </div>
    </>
  );
}
