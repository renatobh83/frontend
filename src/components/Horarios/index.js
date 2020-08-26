import React, { useState, useEffect, createContext, useContext } from "react";
import "./styles.css";
import { getSalas } from "../../api/serviceAPI";
import HorariosGerar from "../../Pages/HorarioGerar";
export const HorariosContext = createContext();
export const useHorarioConext = () => useContext(HorariosContext);
export default function Horarios() {
  const [salas, setSalas] = useState([]);
  const [newHorarios, setNewHorarios] = useState(true);
  const [dias, setDias] = useState([
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sab",
  ]);

  // get Salas
  const handleSalas = async () => {
    await getSalas().then((res) => setSalas(res.data.message));
  };
  useEffect(() => {
    handleSalas();
  }, []);
  const config = {
    salas,
  };
  return (
    <HorariosContext.Provider value={config}>
      {!newHorarios && (
        <div className="horariosContainer">
          <strong>Horarios</strong>
          <button type="submit" onClick={() => setNewHorarios(true)}>
            Gerar novos horarios
          </button>
          <div className="horariosDados">
            <div className="horarioGroup">
              <label htmlFor="sala">Sala</label>
              <select name="sala" id="sala">
                <option value="">Selecione uma sala</option>
                {salas.map((sala) => (
                  <option key={sala._id} value={sala._id}>
                    {sala.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="horarioGroup">
              <label htmlFor="dia">Dia da Semana</label>
              <select name="dia" id="dia">
                <option value="">Dia</option>
                {dias.map((dia, key) => (
                  <option value={key} key={key}>
                    {dia}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="gradeHorarios">
            <ul>
              <li>
                <div className="header">
                  <span>Dia</span>
                  <span>Intervalo</span>
                </div>
              </li>
              <li>terc - 08:00 - 08:15 - apagar </li>
              <li>terc - 08:00 - 08:15 - apagar </li>
              <li>dia - 08:00 - 08:15 - apagar </li>
              <li>dia - 08:00 - 08:15 - apagar </li>
            </ul>
          </div>
        </div>
      )}
      {newHorarios && <HorariosGerar />}
    </HorariosContext.Provider>
  );
}
