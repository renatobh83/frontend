import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import "./styles.css";
import {
  getSalas,
  getHorariosBySala,
  deleteHorario,
} from "../../api/serviceAPI";
import HorariosGerar from "../../Pages/HorarioGerar";

import logoLoading from "../../assets/loading.svg";
import { getHours } from "../../Utils/getHours";
import ModalConfirm from "../../Pages/ModalConfirm";

export const HorariosContext = createContext();
export const useHorarioConext = () => useContext(HorariosContext);

export default function Horarios() {
  const [salas, setSalas] = useState([]);
  const [sala, setSala] = useState("null");
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newHorarios, setNewHorarios] = useState(false);
  // const [m, setM] = useState([]);

  const exitCreatedHours = () => {
    setNewHorarios(!newHorarios);
  };

  // get Salas
  const handleSalas = async () => {
    await getSalas().then((res) => {
      setSalas(res.data.message);
      setLoading(false);
    });
  };
  // get horarios
  const handleHorarios = useCallback(
    async (sala) => {
      await getHorariosBySala(sala).then((res) => {
        getHours(res.data.message, (value) => {
          setHorarios((oldValues) => [...oldValues, value]);
        });
      });
    },
    [] // eslint-disable-line
  );

  const apagarHorario = (date) => {
    const data = {
      deleteHorary: [date],
      sala: sala,
    };

    deleteHorario(data).then(() => {
      const fitler = horarios.filter((h) => h.id !== date);
      setHorarios(fitler);
    });
  };

  const setDiaSemana = (dia) => {
    switch (dia) {
      case 0:
        return "Domingo";
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sábado";
      default:
        break;
    }
  };
  useEffect(() => {
    handleSalas();
  }, []);
  useEffect(() => {
    if (sala !== "null") {
      setHorarios([]);
      handleHorarios(sala);
    } else {
      setHorarios([]);
    }
  }, [sala]); // eslint-disable-line
  const config = {
    salas,
    exitCreatedHours,
  };
  if (loading) {
    return (
      <div className="loading">
        <img src={logoLoading} alt="loading" />
      </div>
    );
  }

  return (
    <HorariosContext.Provider value={config}>
      {!newHorarios && (
        <div className="horariosContainerComponent">
          <strong>Horarios</strong>
          <button
            type="submit"
            className="gerar"
            onClick={() => setNewHorarios(true)}
          >
            Gerar novos horarios
          </button>
          <div className="horariosDados">
            <div className="horarioGroup">
              <label htmlFor="sala">Sala</label>
              <select
                name="sala"
                id="sala"
                onChange={(e) => setSala(e.target.value)}
              >
                <option value="null">Selecione uma sala</option>
                {salas.map((sala) => (
                  <option key={sala._id} value={sala._id}>
                    {sala.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {sala && (
            <div className="gradeHorarios">
              <div className="header">
                <span>Data</span>
                <span>Dia Sem.</span>
                <span>Intervalo</span>
              </div>
              <div className="listIntervalos">
                <ul>
                  {horarios.map((horario) => (
                    <li>
                      <ModalConfirm
                        title="Confirma"
                        description="Tem certeza que deseja apagar?"
                      >
                        {(confirm) => (
                          <form
                            onSubmit={confirm(() => apagarHorario(horario.id))}
                          >
                            <div className="interval">
                              <span>{horario.data}</span>
                              <span>{setDiaSemana(horario.diaSemana)}</span>
                              <span>{horario.horaInicio}</span>
                              <button
                                type="submit"
                                // onClick={confirm(apagarHorario(horario.id))}
                              >
                                Apagar
                              </button>
                            </div>
                          </form>
                        )}
                      </ModalConfirm>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      {newHorarios && <HorariosGerar />}
    </HorariosContext.Provider>
  );
}
