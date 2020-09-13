import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAgend } from "../Agendamento";
import {
  getHorariosBySetor,
  updateHorarioSelecionado,
  storeAgendamento,
} from "../../../api/serviceAPI";
import { getHours, nextInterval } from "../../../Utils/getHours";
import Pagination from "../../../Pages/Pagination";

export default function Horarios() {
  const {
    selPlano,
    setExame,
    exameTeste,
    pacienteId,
    cancel,
    agent,
  } = useAgend();

  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [horariosDisponivel, setHorariosDisponivel] = useState([]);
  const [dateExames, setDateExames] = useState([]);
  const [descExame, setDescExame] = useState();
  const [isConcluir, setIsConcluir] = useState(false);
  const [divSemHorario, setSemHorario] = useState(false);
  const [limitHorario] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [stop, setStop] = useState(0);
  const [dadosAgendamento, setDadosAgendamento] = useState({
    paciente: null,
    dados: [{ exame: "", hora: "" }],
  });

  const cancelar = () => {
    selPlano(true);
    setExame(false);
  };

  /* teste */

  // if (dateExames.length >= 1) {
  //   const exameJaAgen = dateExames.map((e) => {
  //     return e.horario;
  //   });
  //   console.log(exameJaAgen);
  //   setNextHour(exameJaAgen);
  // }

  const indexOfLastPage = currentPage * limitHorario;
  const indexOfFirstPage = indexOfLastPage - limitHorario;
  const current = horariosDisponivel.slice(indexOfFirstPage, indexOfLastPage);
  // proximo Horario

  const handleAgendar = async (e) => {
    if (isConcluir) {
      dadosAgendamento.dados.shift(0);
      await storeAgendamento(dadosAgendamento).then(() => cancel());
    } else {
      const data = {
        horarios: [horarioSelecionado],
        ocupado: true,
      };
      const findHora = horariosDisponivel.find(
        (h) => h.id === horarioSelecionado
      );
      setHorariosDisponivel([]);

      setDadosAgendamento({
        paciente: pacienteId,
        dados: [
          ...dadosAgendamento.dados,
          { exame: exameTeste.exame[stop], hora: findHora },
        ],
        agent,
      });

      setDateExames((oldvalues) => [
        ...oldvalues,
        {
          exame: descExame,
          horario: findHora,
          nextHour: nextInterval(findHora),
        },
      ]);
      setStop(stop + 1);
      await updateHorarioSelecionado(data);
    }
  };
  const horariosLivres = async () => {
    if (stop <= exameTeste.totalExames - 1) {
      const setor = exameTeste.exame[stop].setorId;
      setDescExame(exameTeste.exame[stop].procedimento);
      let next = 0;
      if (dateExames.length >= 1) {
        next = dateExames[stop - 1];
      }
      await getHorariosBySetor(setor, next).then((res) => {
        getHours(res.data.message, (value) => {
          setHorariosDisponivel((oldvalues) => [...oldvalues, value].sort());
        });
        if (res.data.message.length === 0) {
          setSemHorario(true);
        }
      });
    } else {
      setIsConcluir(!isConcluir);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    horariosLivres();
  }, [stop]); // eslint-disable-line
  /* Fim teste */

  const AlertSemHorario = () => {
    return (
      <div>
        <h2>
          <p>1 - Sem Horário Disponivel para o exame selcionado.</p>
          <p>
            2 - Verifique a quantidade de exames e a quantidade de horarios
            disponivel para agendar.
          </p>
          <p>3 - Selecione um intervalo mais cedo se necessário.</p>
        </h2>
      </div>
    );
  };

  const ConcluirAgendamento = () => {
    return (
      <div className="concluirAgendamento">
        Exames :
        <ul>
          {dateExames.map((e) => (
            <li key={e.exame}>
              {e.exame} - {e.horario.data} - {e.horario.horaInicio}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <>
      <div className="horariosContainer">
        {!isConcluir && (
          <div className="agendaExames">
            <strong>Exame</strong>
            <ul>
              <li>{descExame}</li>
            </ul>
          </div>
        )}
        <div className="gridHorarios">
          {divSemHorario && <AlertSemHorario />}
          {current.map((horario) => (
            <label htmlFor={horario.id} key={horario.id}>
              <input
                type="radio"
                name="horario"
                id={horario.id}
                value={horario.id}
                onChange={(e) => setHorarioSelecionado(e.target.value)}
              />

              <div className="cardHorario">
                <div className="dados">
                  <div className="day">{horario.data}</div>
                  <div className="intervalo">{horario.horaInicio}</div>
                  <div className="intervalo">
                    Tempo de duração: {horario.timeInterval} minu.
                  </div>
                </div>
              </div>
            </label>
          ))}
          <div className="pagination">
            <Pagination
              limitHorario={limitHorario}
              totalHorarios={horariosDisponivel.length}
              paginate={paginate}
            />
          </div>
        </div>
        {isConcluir && <ConcluirAgendamento />}
        <div className="btnGroup">
          {!divSemHorario && (
            <button onClick={() => handleAgendar()}>Gravar</button>
          )}
          <button className="danger" onClick={() => cancelar()}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
