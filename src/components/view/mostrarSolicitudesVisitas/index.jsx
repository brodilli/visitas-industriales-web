import React, { useState, useEffect } from "react";
import { Card, Col } from "antd";
import { Button } from "reactstrap";
import { PDFDocument } from "pdf-lib";
import axios from "axios";
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import _raw from "./pruebaPDF2.pdf";
import "./mostrarSolicitudesVisitas.css";

const mostrarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [modal, setModal] = useState(false);
  const [empresas, setEmpresas] = useState([]);

  const [data, setData] = useState({
    id_solicitud: "",
    id_empresa: "",
    id_usuario: "",
    // nombre_empresa: "",
    lugar: "",
    objetivo: "",
    num_alumnos: "",
    num_alumnas: "",
    fecha: "",
    semestre: "",
    grupo: "",
    id_carrera: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });

    // console.log(data);
  };

  const actualizar = (e) => {
    e.preventDefault();
    const sendData = {
      id_visita: data.id_visita,
      id_empresa: data.id_empresa,
      id_usuario: data.id_usuario,
      nombre_empresa: data.nombre_empresa,
      lugar: data.lugar,
      objetivo: data.objetivo,
      num_alumnos: data.num_alumnos,
      num_alumnas: data.num_alumnas,
      fecha: data.fecha,
      semestre: data.semestre,
      grupo: data.grupo,
      asignatura: data.asignatura,
      id_carrera: data.id_carrera,
    };
    console.log(sendData);
    axios
      .post("http://localhost/ws-2/actualizar_solicitud_visita.php", sendData)
      .then((result) => {
        console.log(result.data);
        if (result.data.isOk === "true") {
          setModal(false);
          window.location.reload();
        } else {
          alert("Error al actualizar");
        }
      });
  };
  const abrirModal = (solicitud) => {
    setModal(true);
    setData(solicitud);
    console.log(solicitud);
  };

  const cerrarModal = () => {
    setModal(false);
  };

  useEffect(() => {
    obtenerSolicitudes();
    obtenerEmpresas();
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
    fetch("http://localhost/ws-2/obtener_solicitudes_visitas.php")
      .then((resp) => resp.json())
      .then((json) => {
        //console.log(json);
        setSolicitudes(json);
      });
  };
  const obtenerEmpresas = () => {
    fetch("http://localhost/ws-2/obtener_empresas.php")
      .then((resp) => resp.json())
      .then((json) => {
        //console.log(json);
        setEmpresas(json);
      });
  };

  return (
    <>
      <div>
        <h1>Solicitudes de visitas</h1>
        <div className="contenedorSolicitudes">
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

                      <div className="botonesMostrar">
                        <Button
                          color="secondary"
                          className="modificar"
                          onClick={() => abrirModal(solicitud)}
                        >
                          {" "}
                          Modificar{" "}
                        </Button>
                        <Button
                          color="success"
                          onClick={() => modifyPdf(solicitud)}
                        >
                          {" "}
                          Imprimir{" "}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              </div>
            ))}
        </div>
      </div>
      <Modal isOpen={modal}>
        <ModalHeader>
          <h3>Editar Solicitud</h3>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="id_usuario">id_visita</Label>
            <Input
              value={data.id_visita}
              type="text"
              name="id_usuario"
              id="id_usuario"
              placeholder="id_usuario"
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="id_empresa">empresa</Label>
            <br />
            <select
              // ref={refId_empresa}
              name="id_empresa"
              id="id_empresa"
              className="select-empresa form-control"
              value={data.id_empresa}
              onChange={handleChange}
              required
            >
              {empresas.sort().map((empresas, i) => (
                <option key={i} value={empresas.id_empresa}>
                  {`${empresas.nombre_empresa}` +
                    "  " +
                    "(" +
                    `${empresas.lugar}` +
                    ")"}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="fecha">Fecha</Label>
            <Input
              value={data.fecha}
              type="date"
              name="fecha"
              id="fecha"
              placeholder="fecha"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="asignatura">Asignatura</Label>
            <Input
              value={data.asignatura}
              type="text"
              name="asignatura"
              id="asignatura"
              placeholder="asignatura"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="objetivo">Objetivo</Label>
            <Input
              value={data.objetivo}
              type="text"
              name="objetivo"
              id="objetivo"
              placeholder="objetivo"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="grupo">Grupo</Label>
            <Input
              value={data.grupo}
              type="text"
              name="grupo"
              id="grupo"
              maxLength={1}
              pattern="[A-Z]"
              placeholder="grupo"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="semestre">Semestre</Label>
            <select
              name="semestre"
              id="semestre"
              onChange={handleChange}
              value={data.semestre}
              defaultValue="1"
            >
              <option value="1">1°</option>
              <option value="2">2°</option>
              <option value="3">3°</option>
              <option value="4">4°</option>
              <option value="5">5°</option>
              <option value="6">6°</option>
              <option value="7">7°</option>
              <option value="8">8°</option>
              <option value="9">9°</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="num_alumnos">Número de alumnos</Label>
            <Input
              value={data.num_alumnos}
              type="number"
              name="num_alumnos"
              id="num_alumnos"
              min={"1"}
              placeholder="num_alumnos"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="num_alumnas">Número de alumnas</Label>
            <Input
              value={data.num_alumnas}
              type="number"
              name="num_alumnas"
              id="num_alumnas"
              min={"1"}
              placeholder="num_alumnas"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="carrera">Carrera</Label>
            <select
              for="id_carrera"
              name="id_carrera"
              id="id_carrera"
              className="form-control"
              onChange={handleChange}
              value={data.id_carrera}
            >
              <option value="1">Arquitectura</option>
              <option value="2">Contador Público</option>
              <option value="3">Ingeniería Informática</option>
              <option value="4">Ingeniería Ambiental</option>
              <option value="5">Ingeniería Mecánica</option>
              <option value="6">Ingeniería Electrica</option>
              <option value="7">Ingeniería en Sistemas Computacionales</option>
              <option value="8">Ingeniería Industrial</option>
              <option value="9">Ingeniería Electrónica</option>
              <option value="10">Ingeniería en Gestión Empresarial</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={actualizar}>
            Actualizar
          </Button>{" "}
          <Button color="danger" onClick={cerrarModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default mostrarSolicitudes;
