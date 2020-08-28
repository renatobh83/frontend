import { differenceInDays } from "date-fns";

export const getDiffDays = (props) => {
  const date = stringToDate(props);
  const today = new Date();
  const diffDates = differenceInDays(today, date);
  return diffDates;
};

export const getHours = (props, callback) => {
  props.forEach((element) => {
    element.periodo.filter((dia) => {
      const date = stringToDate(dia.data);
      const today = new Date();
      const diffDates = differenceInDays(today, date);
      if (diffDates <= 0) {
        callback(dia);
      }
    });
  });
};
const stringToDate = (date) => {
  const parts = date.split("/");
  const convertDate = new Date(parts[2], parts[1] - 1, parts[0]);
  return convertDate;
};
