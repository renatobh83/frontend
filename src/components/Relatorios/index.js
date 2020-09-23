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

export default function Relatorios() {
  const [isLoading, setIsloading] = useState(true);
  const [mesAtual, setMesAtual] = useState(new Date());

  const [showPeriodo, setShowPeriodo] = useState(false);
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
    const dados = document.getElementById("chartContent");
    html2canvas(dados, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const style = StyleSheet.create({
        page: {
          flexDirection: "row",
          backgroundColor: "#fff",
        },
        section: {
          margin: 10,
          padding: 1,
          flexGrow: 1,
        },
      });
      let print = (
        <Document>
          <Page size="A4" style={style.page}>
            <View style={style.section}>
              <Text
                style={{
                  margin: 12,
                  fontSize: 20,
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                <Image source={imgData} />
              </Text>
            </View>
          </Page>
        </Document>
      );
      setState({ ...state, pdf: print });
    });
    setState({ ...state, showPdf: false });
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
        ? [["Agent", "Total", { role: "annotation" }]].concat(
            response.data.AgendamentoDia.map((r) => [r._id, r.count, r.count])
          )
        : [
            ["Agent", "Total"],
            [0, 0],
          ];

    const agendamentoExame = [["Setor", "Total"]].concat(
      response.data.AgendadosMes.map((r) => [r._id.nome, r.count])
    );
    const horariosMes =
      response.data.HorariosMes.length > 0
        ? [["Setor", "Horarios disponibilizados"]].concat(
            response.data.HorariosMes.map((r) => [r._id.nome, r.count])
          )
        : [
            ["Setor", "Horarios disponibilizados"],
            [0, 0],
          ];

    const totalHorarioAgenda =
      response.data.TaxaHorarioAgendamento.length > 0
        ? [
            ["Setor", "Horarios", "Agendamentos", { role: "annotation" }],
          ].concat(response.data.TaxaHorarioAgendamento)
        : [
            ["Setor", "Horarios", "Agendamentos"],
            [0, 0, 0],
          ];
    const agendamentoMesDia =
      response.data.AgendamentoMesFuncionario.length > 0
        ? [["Data", "Agent", { role: "annotation" }]].concat(
            response.data.AgendamentoMesFuncionario.map((a) => [
              a._id.dt,
              a.count,
              `${a._id.ag} ${a.count}`,
            ])
          )
        : [
            ["Data", "Agent", { role: "annotation" }],
            [0, 0, 0],
          ];
    const examesAgendado =
      response.data.ExamesAgendado.length > 0
        ? [["Exame", "Quantidade"]].concat(
            response.data.ExamesAgendado.map((r) => [r._id, r.count])
          )
        : [
            ["Exame", "Quantidade"],
            [0, 0],
          ];
    setState({
      ...state,
      data: [
        agendamentoPorAgent,
        agendamentoExame,
        horariosMes,
        totalHorarioAgenda,
        agendamentoMesDia,
        examesAgendado,
      ],
    });
    setIsloading(false);
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
        <button type="submit" onClick={() => exporta()} className="danger">
          Exportar relatorio
        </button>
        <button type="submit" onClick={() => changeMonth()}>
          Proximo mes
        </button>
      </div>
      <div className="chartContent" id="chartContent">
        {!showPeriodo && (
          <>
            <div className="chart">
              <h3>{`Agendamento dia ${format(new Date(), "dd/MM/yyyy")}`}</h3>
              <Chart
                width={"98%"}
                height={300}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={state.data[0]}
                options={{
                  legend: "none",
                  hAxis: {
                    title: "Agent",
                    minValue: 0,
                  },
                  vAxis: {
                    title: "Agendamentos",
                  },
                }}
              />
              <button type="submit" onClick={() => setShowPeriodo(true)}>
                Periodo
              </button>
            </div>
            <div className="chart">
              <h3>
                {`Agendados por setor em ${format(mesAtual, "MMMM/yyyy", {
                  locale: brasilLocal,
                })}
              `}
              </h3>
              <Chart
                width={"98%"}
                height={300}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={state.data[1]}
                options={{
                  // Just add this option
                  is3D: true,

                  legend: {
                    position: "bottom",
                    maxLines: 3,
                  },
                  slices: {
                    2: { offset: 0.2 },
                  },
                }}
              />
            </div>
            <div className="chart">
              <h3>
                {`Horario disponibilizados para ${format(
                  mesAtual,
                  "MMMM/yyyy",
                  {
                    locale: brasilLocal,
                  }
                )}
              `}
              </h3>
              <Chart
                width={"98%"}
                height={300}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={state.data[2]}
                options={{
                  legend: "none",
                  hAxis: {
                    title: "Setor",
                    minValue: 0,
                  },
                  vAxis: {
                    title: "Horarios disponilizados",
                  },
                }}
              />
            </div>
            <div className="chart">
              <h3>
                {`Horarios disponibilizados vs Agendados  ${format(
                  mesAtual,
                  "MMMM/yyyy",
                  {
                    locale: brasilLocal,
                  }
                )}
              `}
              </h3>
              <Chart
                width={"98%"}
                height={"300px"}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={state.data[3]}
                options={{
                  legend: { position: "bottom", maxLines: 3 },
                  colors: ["#0f69af", "#e61e50"],
                  hAxis: {
                    title: "Total",
                    minValue: 0,
                  },
                  vAxis: {
                    title: "Setor",
                  },
                }}
              />
            </div>

            <div className="chart">
              {" "}
              <Chart
                width={"98%"}
                height={300}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={state.data[5]}
                options={{
                  legend: "none",
                  hAxis: {
                    title: "Exame",
                    minValue: 0,
                  },
                  vAxis: {
                    title: "Total",
                  },
                }}
              />{" "}
            </div>
          </>
        )}
        {showPeriodo && (
          <ReportAgent dateGraph={state.data[4]} close={setShowPeriodo} />
        )}
      </div>
    </div>
  );
}

const ReportAgent = ({ dateGraph, close }) => {
  return (
    <div className="periodo">
      <div className="chart">
        <Chart
          width={"98%"}
          height={300}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={dateGraph}
          options={{
            legend: "none",
            hAxis: {
              title: "Periodo",
              minValue: 0,
            },
            vAxis: {
              title: "Total",
            },
          }}
        />
      </div>
      <div>
        <button type="submit" onClick={() => close(false)}>
          Close
        </button>
      </div>
    </div>
  );
};
