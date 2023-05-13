import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";
import "./Export.css";

const ExportarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const obtenerSolicitudes = () => {
    fetch("http://localhost/ws-2/obtener_solicitudes_visitas.php")
      .then((resp) => resp.json())
      .then((json) => {
        setSolicitudes(json);
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
