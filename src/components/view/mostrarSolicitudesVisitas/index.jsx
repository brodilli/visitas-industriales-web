import React, { useState, useEffect } from "react";
import { Card, Col, Button } from "antd";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFile } from "fs/promises";

import "./mostrarSolicitudesVisitas.css";

const mostrarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const imprimir = (solicitud) => {
    console.log(solicitud);
  };
  async function modifyPdf() {
    // Cargar el pdf
    const pdfDoc = await readFile("./Prueba.pdf");
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    // MOdificar el pdf
    await pdfDoc.save("src/Documents/PruebaModify.pdf", pdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText("This text was added with JavaScript!", {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    });

    const pdfBytes = await pdfDoc.save();
  }

  const obtenerSolicitudes = () => {
    fetch("http://localhost/ws-2/obtener_solicitudes_visitas.php")
      .then((resp) => resp.json())
      .then((json) => {
        //console.log(json);
        setSolicitudes(json);
      });
  };

  return (
    <div>
      <h1>Solicitudes de visitas</h1>
      <div className="contenedor">
        {solicitudes.length > 0 &&
          solicitudes.map((solicitud, i) => (
            <div className="carta">
              <Col key={i} span={8}>
                <Card title={"id: " + solicitud.id_visita}>
                  <div className="informacion">
                    <p></p>
                    <p>Nombre de la empresa: {solicitud.nombre_empresa}</p>
                    <p>
                      Nombre del usuario: {solicitud.nombres}{" "}
                      {solicitud.apellidoP} {solicitud.apellidoM}
                    </p>
                    <p>Fecha: {solicitud.fecha}</p>
                    <p>Asignatura: {solicitud.asignatura}</p>
                    <p>Objetivo: {solicitud.objetivo}</p>
                    <p>Grupo: {solicitud.grupo}</p>
                    <p>Semestre: {solicitud.semestre}</p>
                    <p>Numero de alumnos: {solicitud.num_alumnos}</p>
                    <p>Numero de alumnas: {solicitud.num_alumnas}</p>
                    <p>Nombre de la carrera: {solicitud.nombre_carrera}</p>
                    <Button onClick={modifyPdf}> Imprimir </Button>
                  </div>
                </Card>
              </Col>
            </div>
          ))}
      </div>
    </div>
  );
};
export default mostrarSolicitudes;
