import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";
import "./Export.css";
import axios from "axios";

const ExportarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [rango, setRango] = useState("1");
  const [reloadView, setReloadView] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    obtenerSolicitudes();
    setReloadView(false);
  }, [reloadView]);

  const obtenerSolicitudes = () => {
    axios
      .post(apiUrl + "/obtener_solicitudes_visitas.php", {
        rango,
      })
      .then((response) => {
        setSolicitudes(response.data);
        setReloadView(false);
      })
      .catch((error) => {
        console.error("Error al obtener las solicitudes:", error);
      });
  };

  const headers = [
    { label: "id_visita", key: "id_visita" },
    { label: "Lugar", key: "lugar" },
    { label: "Empresa", key: "nombre_empresa" },
    { label: "No. Alumnos", key: "num_alumnos" },
    { label: "No. Alumnas", key: "num_alumnas" },
    { label: "Semestre", key: "semestre" },
    { label: "Grupo", key: "grupo" },
    { label: "Carrera", key: "nombre_carrera" },
    { label: "Fecha", key: "fecha" },
  ];

  return (
    <>
      <div className="export">
        <h1>Exportar Solicitudes de visitas</h1>
        <select
          className="form-control"
          id="tipoUser"
          value={rango}
          onChange={(e) => {
            setRango(e.target.value); // Actualizar el estado 'rango' con el valor seleccionado
            obtenerSolicitudes(e.target.value);
            setReloadView(true);
          }}
        >
          <option value="1">Este semestre</option>
          <option value="2">Todas</option>
        </select>
        <div className="contenedorExportarSolicitudes">
          <table>
            <thead>
              <tr>
                <th>id_visita</th>
                <th>Lugar</th>
                <th>Empresa</th>
                <th>No. Alumnos</th>
                <th>No. Alumnas</th>
                <th>Semestre</th>
                <th>Grupo</th>
                <th>Carrera</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.id_visita}>
                  <td>{solicitud.id_visita}</td>
                  <td>{solicitud.lugar}</td>
                  <td>{solicitud.nombre_empresa}</td>
                  <td>{parseInt(solicitud.num_alumnos)}</td>
                  <td>{parseInt(solicitud.num_alumnas)}</td>
                  <td>{solicitud.semestre}</td>
                  <td>{solicitud.grupo}</td>
                  <td>{solicitud.nombre_carrera}</td>
                  <td>{solicitud.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CSVLink
          data={solicitudes}
          headers={headers}
          filename={"Solicitudes.csv"}
        >
          <Button className="botonExport">Descargar</Button>
        </CSVLink>
      </div>
    </>
  );
};

export default ExportarSolicitudes;
