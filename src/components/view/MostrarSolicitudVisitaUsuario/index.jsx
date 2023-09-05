import React, { useState, useEffect } from "react";
import { Card, Col, Button } from "antd";
import { PDFDocument } from "pdf-lib";
import _raw from "../mostrarSolicitudesVisitas/pruebaPDF2.pdf";
import { useSelector } from "react-redux";
import axios from "axios";
import Estatus from "../mostrarSolicitudesVisitas/Estatus";
import "./mostrarSolicitudesVisitasUser.css";

const mostrarSolicitudesUsuario = () => {
  const { id_usuario } = useSelector((state) => state.login);
  const [solicitudes, setSolicitudes] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  async function modifyPdf(solicitud) {
    const alumnosTotales =
      parseInt(solicitud.num_alumnos) + parseInt(solicitud.num_alumnas);

    // read document

    const existingPdfBytes = await fetch(_raw).then((res) => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

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
      .setText(solicitud.nombre_empresa + "\n" + solicitud.lugar);

    form
      .getTextField("Área a observar y objetivo1")
      .setText(solicitud.objetivo);
    form.getTextField("numAlum").setText(alumnosTotales.toString());
    form.getTextField("Fecha  Turno1").setText(solicitud.fecha);
    form
      .getTextField("carrera")
      .setText(
        solicitud.semestre +
          "°" +
          solicitud.grupo +
          "\n" +
          solicitud.nombre_carrera,
        {
          size: 10,
        }
      );
    form.getTextField("fecha").setText(solicitud.fecha);
    form.getTextField("periodo").setText("enero-junio", { size: 20 });
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
  }

  const obtenerSolicitudes = () => {
    const sendData = {
      id_usuario: id_usuario,
    };
    axios
      .post(serverUrl + "/ws-2/obtener_solicitud_visita_usuario.php", sendData)
      .then((result) => {
        console.log(result.data);
        setSolicitudes(result.data);
      });
    console.log(sendData);
  };

  return (
    <div>
      <h1>Solicitudes de visitas</h1>
      <div className="contenedorSolicitudes">
        {solicitudes.length > 0 &&
          solicitudes.map((solicitud, i) => (
            <div className="carta">
              <Col key={i} span={8}>
                <Card
                  title={
                    <div className="titulo">
                      id:{+solicitud.id_visita}
                      <Estatus estatus={solicitud.estatus} />
                    </div>
                  }
                >
                  <div className="informacion">
                    <p></p>
                    <p>Nombre de la empresa: {solicitud.nombre_empresa}</p>
                    <p>
                      Nombre del usuario: {solicitud.nombres}{" "}
                      {solicitud.apellidoP} {solicitud.apellidoM}
                    </p>
                    <p>Fecha: {solicitud.fecha}</p>
                    <p>Hora salida: {solicitud.horaSalida}</p>
                    <p>Hora llegada: {solicitud.horaLlegada}</p>
                    <p>Asignatura: {solicitud.asignatura}</p>
                    <p>Objetivo: {solicitud.objetivo}</p>
                    <p>Grupo: {solicitud.grupo}</p>
                    <p>Semestre: {solicitud.semestre}</p>
                    <p>Numero de alumnos: {solicitud.num_alumnos}</p>
                    <p>Numero de alumnas: {solicitud.num_alumnas}</p>
                    <p>Nombre de la carrera: {solicitud.nombre_carrera}</p>
                    <p>Comentarios: {solicitud.comentarios}</p>
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
export default mostrarSolicitudesUsuario;
