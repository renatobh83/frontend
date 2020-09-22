import React, { useCallback, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import brasilLocal from "date-fns/locale/pt-BR";
import "./styles.css";
import html2canvas from "html2canvas";
import { report } from "../../api/serviceAPI";
import { addMonths, format, subMonths } from "date-fns";
import { Jumbotron } from "reactstrap";

export default function Relatorios() {
  const [isLoading, setIsloading] = useState(true);
  const [mesAtual, setMesAtual] = useState(new Date());

  const [state, setState] = useState({
    data: null,
    wait: false,
    showForm: true,
    erros: [],
    pdf: null,
    showPdf: false,
  });

  const fetchReport = useCallback(async () => {
    const response = await report();
    attReport(response);
  }, []); //eslint-disable-line
  const exporta = () => {
    console.log(state.data[1]);
    // const dados = document.getElementById("relatorioContainer");

    // html2canvas(dados, { scrollY: -window.scrollY }).then((canvas) => {
    //   const imgData = canvas
    //     .toDataURL("image/png")
    //     .replace("image/png", "image/octet-stream");

    //   const style = StyleSheet.create({
    //     page: {
    //       flexDirection: "row",
    //       backgroundColor: "#fff",
    //     },
    //     section: {
    //       margin: 10,
    //       padding: 1,
    //       flexGrow: 1,
    //     },
    //   });
    //   let print = (
    //     <Document>
    //       <Page size="A4" style={style.page}>
    //         <View style={style.section}>
    //           <Text
    //             style={{
    //               margin: 12,
    //               fontSize: 20,
    //               textAlign: "center",
    //               fontStyle: "italic",
    //             }}
    //           >
    //             CO-TCC - Relatório
    //             <Image source={imgData} />
    //           </Text>
    //         </View>
    //       </Page>
    //     </Document>
    //   );
    //   setState({ ...state, pdf: print });
    // });
    // setState({ ...state, showPdf: false });
  };
  const changeMonth = async () => {
    const next = addMonths(mesAtual, 1);
    setMesAtual(next);
    await report(next).then((res) => attReport(res));
  };
  const prevMonth = async () => {
    const prev = subMonths(mesAtual, 1);
    setMesAtual(prev);
    await report(prev).then((res) => attReport(res));
  };
  const attReport = (response) => {
    const agendamentoPorAgent =
      response.data.AgendamentoDia.length > 0
        ? [["Agent", "Quantidade"]].concat(
            response.data.AgendamentoDia.map((r) => [r._id, r.count])
          )
        : [
            ["Agent", "Quantidade"],
            [0, 0],
          ];

    const agendamentoExame = [["Setor", "Total"]].concat(
      response.data.AgendadosMes.map((r) => [r._id.nome, r.count])
    );
    const horariosMes = [["Setor", "Horarios disponibilizados"]].concat(
      response.data.HorariosMes.map((r) => [r._id.nome, r.count])
    );

    const totalMes = response.data.HorariosMes.map((r) => {
      return [r._id.nome, r.count];
    });
    const totalHorarioAgenda =
      response.data.TaxaHorarioAgendamento.length > 0
        ? [["Setor", "Horarios disponibilizados", "Total agenda"]].concat(
            response.data.TaxaHorarioAgendamento
          )
        : [
            ["Setor", "Horarios disponibilizados", "Total agenda"],
            [0, 0, 0],
          ];

    const totalAgenda = response.data.AgendadosMes.map((r) => [
      r._id.nome,
      r.count,
    ]);
    combine(totalMes, totalAgenda);
    setState({
      ...state,
      data: [
        agendamentoPorAgent,
        agendamentoExame,
        horariosMes,
        totalHorarioAgenda,
      ],
    });
    setIsloading(false);
  };
  const combine = (...arrays) => {
    // console.log([...new Set([...jointArray])]);
  };
  useEffect(() => {
    fetchReport();
  }, []); //eslint-disable-line
  if (isLoading) {
    return <div>Loadding</div>;
  }
  return (
    <div className="relatorioContainer" id="relatorioContainer">
      <div className="btnGroup">
        <button type="submit" onClick={() => prevMonth()}>
          Mes anterior
        </button>
        <button type="submit" onClick={() => changeMonth()}>
          Proximo mes
        </button>
      </div>
      <div className="chart">
        <span>{`${format(new Date(), "dd/MM/yyyy")}`}</span>
        <Chart
          width={500}
          height={300}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={state.data[0]}
          options={{
            title: "Agandamento por Agent",
            chartArea: { width: "40%" },
            hAxis: {
              title: "Agents",
              minValue: 0,
            },
            vAxis: {
              title: "Total Agendamento",
            },
          }}
          legendToggle
        />
        <div className="btnGroup">
          <button type="submit" onClick={() => prevMonth()}>
            dia anterior
          </button>
          <button type="submit" onClick={() => changeMonth()}>
            Proximo mes
          </button>
        </div>
      </div>
      <div className="chart">
        <Chart
          width={500}
          height={300}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={state.data[1]}
          options={{
            title: `Total agendado por setor em ${format(
              mesAtual,
              "MMMM/yyyy",
              {
                locale: brasilLocal,
              }
            )}`,
            is3D: true,
          }}
          legendToggle
        />
      </div>
      <div className="chart">
        <Chart
          width={500}
          height={300}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={state.data[2]}
          options={{
            title: `Horario disponibilizados para ${format(
              mesAtual,
              "MMMM/yyyy",
              {
                locale: brasilLocal,
              }
            )}`,

            is3D: true,
          }}
          rootProps={{ "data-testid": "2" }}
        />
      </div>
      <div className="chart">
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={state.data[3]}
          options={{
            title: "Horarios disponibilizados vs Agendados",
            chartArea: { width: "50%" },
            colors: ["#b0120a", "#ffab91"],
            hAxis: {
              title: "Total",
              minValue: 0,
            },
            vAxis: {
              title: "Setor",
            },
          }}
          legendToggle
        />
      </div>
      <div className="chart">Agendamdos</div>
      <div className="chart">horarios </div>
    </div>
  );
}
