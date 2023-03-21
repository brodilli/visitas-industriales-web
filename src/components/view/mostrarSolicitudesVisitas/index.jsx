import React, { useState, useEffect } from "react";
import { Card, Col, Button } from "antd";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import _raw from "./pruebaPDF2.pdf";
import "./mostrarSolicitudesVisitas.css";

const mostrarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const imprimir = (solicitud) => {
    console.log(solicitud);
  };
  async function modifyPdf(solicitud) {
    // const url =
    //   "https://drive.google.com/uc?id=1NjbgYb10LpDvPUi8Ix-XayidRRmHc8Id&";

    // const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
    // const pdfDoc = await PDFDocument.load(arrayBuffer);

    // read document

    const existingPdfBytes = await fetch(_raw).then((res) => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const times = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();

    const fieldNames = pdfDoc
      .getForm()
      .getFields()
      .map((f) => f.getName());
    console.log({ fieldNames });
    // const courier = await pdfDoc.embedFont(StandardFonts.Courier);
    //Se obtiene el formulario
    const form = pdfDoc.getForm();

    form
      .getTextField("Empresa  Ciudad1")
      .setText(solicitud.nombre_empresa + solicitud.lugar);

    form
      .getTextField("Área a observar y objetivo1")
      .setText(solicitud.objetivo);
    form.getTextField("numAlum").setText(solicitud.num_alumnos);
    form.getTextField("Fecha  Turno1").setText(solicitud.fecha);
    form
      .getTextField("carrera")
      .setText(
        solicitud.semestre + solicitud.grupo + "-" + solicitud.nombre_carrera
      );
    form.getTextField("fecha").setText(solicitud.fecha);
    form.getTextField("periodo").setText("enero-junio");
    form
      .getTextField("Solicitante Asignatura1")
      .setText(
        solicitud.nombres +
          " " +
          solicitud.apellidoP +
          " " +
          solicitud.apellidoM
      );
    form
      .getTextField("Solicitante Asignatura1_2")
      .setText(solicitud.asignatura);

    // Draw a string of text diagonally across the first page
    // firstPage.drawText("This text was added with JavaScript!", {
    //   x: 5,
    //   y: height / 2 + 300,
    //   size: 50,
    //   font: times,
    //   color: rgb(0.95, 0.1, 0.1),
    //   rotate: degrees(-45),
    // });

    const pdfBytes = await pdfDoc.save();

    //Download the PDF document
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    downloadLink.download = "solicitud_visita.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    console.log(solicitud);
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
                    <Button onClick={() => modifyPdf(solicitud)}>
                      {" "}
                      Imprimir{" "}
                    </Button>
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
