import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useDownloadExcel } from "table-to-excel-react";
import "./Export.css";
const exportarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  const { onDownload } = useDownloadExcel({
    fileName: "Solicitudes",
    table: "table-to-xls",
    sheet: "Hoja 1",
  });
  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const obtenerSolicitudes = () => {
    fetch("http://localhost/ws-2/obtener_solicitudes_visitas.php")
      .then((resp) => resp.json())
      .then((json) => {
        //console.log(json);
        setSolicitudes(json);
      });
  };

  return (
    <>
      <div className="export">
        <h1>Exportar Solicitudes de visitas</h1>
        <div className="contenedorExportarSolicitudes">
          <table id="table-to-xls">
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
                <tr>
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
        <Button className="botonExport" onClick={onDownload}>
          Download
        </Button>
      </div>
    </>
  );
};
export default exportarSolicitudes;
