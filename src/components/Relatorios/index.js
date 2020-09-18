import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

import img from "../../assets/landing.svg";
import "./styles.css";
import html2canvas from "html2canvas";

export default function Relatorios() {
  const [state, setState] = useState({
    pdf: null,
    showPdf: true,
  });
  const exporta = () => {
    const dados = document.getElementById("relatorioContainer");

    html2canvas(dados, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

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
                CO-TCC - Relatório
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
  return (
    <>
      <div className="relatorioContainer" id="relatorioContainer">
        <div className="cardRelatorio">
          <img src={img} alt="" />
          <input type="text" />
        </div>
        <div className="cardRelatorio">
          <img src={img} alt="" />
          <input type="text" />
        </div>
        <div className="cardRelatorio">
          <img src={img} alt="" />
          <input type="text" />
        </div>
        <div className="cardRelatorio">
          <img src={img} alt="" />
          <input type="text" />
        </div>
        <button onClick={() => exporta()}>Exportar</button>
      </div>
      {state.showPdf && (
        <div>
          <PDFDownloadLink document={state.pdf} fileName={"relatorio.pdf"}>
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download"
            }
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
}
