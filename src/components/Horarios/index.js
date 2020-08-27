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
import { differenceInCalendarDays } from "date-fns";
export const HorariosContext = createContext();
export const useHorarioConext = () => useContext(HorariosContext);
export default function Horarios() {
  const [salas, setSalas] = useState([]);
  const [sala, setSala] = useState(null);
  const [horarios, setHoraios] = useState([]);
  const [newHorarios, setNewHorarios] = useState(false);
  const [dias, setDias] = useState([
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sab",
  ]);

  const exitCreatedHours = () => {
    setNewHorarios(!newHorarios);
  };

  // get Salas
  const handleSalas = async () => {
    await getSalas().then((res) => setSalas(res.data.message));
  };
  // get horarios
  const handleHorarios = useCallback(
    async (sala) => {
      await getHorariosBySala(sala).then((res) => {
        res.data.message.forEach((element) => {
          const horarioAtual = element.periodo.filter((dia) => {
            const date = stringToDate(dia.data);
            const now = new Date();
            const diff = differenceInCalendarDays(now, date);
            return diff <= 0;
          });
          setHoraios(horarioAtual);
        });
      });
    },
    [] // eslint-disable-line
  );
  const stringToDate = (date) => {
    const parts = date.split("/");
    const convertDate = new Date(parts[2], parts[1] - 1, parts[0]);
    return convertDate;
  };
  const apagarHorario = async (date) => {
    const data = {
      deleteHorary: [date],
      sala: sala,
    };
    await deleteHorario(data).then(() => {
      const fitler = horarios.filter((h) => h.id !== date);
      setHoraios(fitler);
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
    if (sala !== null) {
      handleHorarios(sala);
    }
  }, [sala]); // eslint-disable-line
  const config = {
    salas,
    exitCreatedHours,
  };
  return (
    <HorariosContext.Provider value={config}>
      {!newHorarios && (
        <div className="horariosContainer">
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
                <option value="">Selecione uma sala</option>
                {salas.map((sala) => (
                  <option key={sala._id} value={sala._id}>
                    {sala.nome}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="horarioGroup">
              <label htmlFor="dia">Dia da Semana</label>
              <select name="dia" id="dia">
                <option value="">Dia</option>
                {dias.map((dia, key) => (
                  <option value={key} key={key}>
                    {dia}
                  </option>
                ))}
              </select>
            </div> */}
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
                  {horarios.map((horario, i) => (
                    <li>
                      <div className="interval">
                        <span>{horario.data}</span>
                        <span>{setDiaSemana(horario.diaSemana)}</span>
                        <span>{horario.horaInicio}</span>
                        <button
                          type="submit"
                          onClick={() => apagarHorario(horario.id)}
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
        </div>
      )}
      {newHorarios && <HorariosGerar />}
    </HorariosContext.Provider>
  );
}
