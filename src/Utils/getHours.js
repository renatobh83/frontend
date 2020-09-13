import {
  differenceInDays,
  differenceInMinutes,
  addHours,
  differenceInHours,
} from "date-fns";
import { inativarHorarioPassado } from "../api/serviceAPI";

// export const getDiffDays = (props) => {
//   const date = stringDate(props);
//   const today = new Date();
//   const diffDates = differenceInDays(today, date);

//   return diffDates;
// };

export const getHours = (props, callback) => {
  props.forEach((element) => {
    element.periodo.filter(async (dia) => {
      const date = stringDate(dia);
      const newHour = addHours(date, 3);
      const today = new Date();
      const diffDates = differenceInDays(today, date);
      const hora = differenceInHours(today, newHour);
      const minutos = differenceInMinutes(today, newHour);

      if (diffDates <= 0) {
        if (hora <= -0 && minutos < 0) {
          callback(dia);
        } else {
          if (dia.ativo) {
            await inativarHorarioPassado(dia);
          }
        }
      } else {
        if (dia.ativo) {
          await inativarHorarioPassado(dia);
        }
      }
    });
  });
};
const stringDate = (value) => {
  const parts = value.data.split("/");
  const splitTime = value.horaInicio.split(":");
  const hora = splitTime[0].length === 1 ? `0${splitTime[0]}` : splitTime[0];
  const minuto = splitTime[1];
  const convertDate = new Date(
    `${parts[2]}-${parts[1]}-${parts[0]}T${hora}:${minuto}:00.000Z`
  );
  return convertDate;
};
export const nextInterval = (t) => {
  const splitTime = t.horaInicio.split(":");
  let temp = 0;
  let nova_h = 0;
  let novo_m = 0;
  const hora = parseInt(splitTime[0]);
  const minuto = parseInt(splitTime[1]);
  temp = minuto + t.timeInterval;

  while (temp > 59) {
    nova_h++;
    temp = temp - 60;
  }
  novo_m = temp.toString().length === 2 ? temp : "0" + temp;
  temp = hora + nova_h;
  while (temp > 23) {
    temp = temp - 24;
  }
  nova_h = temp.toString().length === 2 ? temp : "0" + temp;

  const parts = t.data.split("/");
  const returnDate = new Date(
    `${parts[2]}-${parts[1]}-${parts[0]}T${nova_h}:${novo_m}:00.000Z`
  );
  return returnDate;
};
