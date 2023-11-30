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
import _1raw from "./1.pdf";
import _2raw from "./2.pdf";
import _3raw from "./3.pdf";
import _4raw from "./4.pdf";
import "./mostrarSolicitudesVisitas.css";
import Estatus from "./Estatus";

const mostrarSolicitudes = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [solicitudes, setSolicitudes] = useState([]);
  const [modal, setModal] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [reloadView, setReloadView] = useState(false);
  const [diasOcupados, setDiasOcupados] = useState([]);
  const [rango, setRango] = useState("");

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
    horaSalida: "",
    horaLlegada: "",
    semestre: "",
    grupo: "",
    id_carrera: "",
    estatus: "",
    comentarios: "",
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
      horaSalida: data.horaSalida,
      horaLlegada: data.horaLlegada,
      semestre: data.semestre,
      grupo: data.grupo,
      asignatura: data.asignatura,
      id_carrera: data.id_carrera,
      estatus: data.estatus,
      comentarios: data.comentarios,
    };
    console.log(sendData);
    axios
      .post(apiUrl + "/actualizar_solicitud_visita.php", sendData)
      .then((result) => {
        console.log(result.status);
        if (result.status === 200) {
          setModal(false);
          setReloadView(true);
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
    const fetchData = async () => {
      try {
        await obtenerSolicitudes();
        await obtenerEmpresas();
        await obtenerDiasOcupados();
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setReloadView(false);
      }
    };

    fetchData();
  }, [reloadView, diasOcupados]);

  async function obtenerSolicitudesPDF(solicitud) {
    const sendData = {
      id_usuario: solicitud.id_usuario,
      id_carrera: solicitud.id_carrera,
      semestre: solicitud.semestre,
      grupo: solicitud.grupo,
      asignatura: solicitud.asignatura,
    };

    try {
      const result = await axios.post(
        apiUrl + "/obtener_solicitudes_pdf.php",
        sendData
      );
      const data = result.data;
      await modifyPdf(data, solicitud.id_carrera);
    } catch (error) {
      console.error(error);
    }
  }

  async function modifyPdf(solicitud, id_carrera) {
    var existingPdfBytes = "nada";
    var numero;
    console.log(solicitud);
    const sendData = {
      id_usuario: solicitud[0].id_usuario,
      id_carrera: id_carrera,
      semestre: solicitud[0].semestre,
      grupo: solicitud[0].grupo,
      asignatura: solicitud[0].asignatura,
    };
    console.log(sendData);

    try {
      const result = await axios.post(
        apiUrl + "/num_solicitud_usuario.php",
        sendData
      );
      console.log(result.data);
      numero = result.data;
      console.log(numero);

      switch (numero) {
        case 1:
          existingPdfBytes = await fetch(_1raw).then((res) =>
            res.arrayBuffer()
          );
          break;
        case 2:
          existingPdfBytes = await fetch(_2raw).then((res) =>
            res.arrayBuffer()
          );
          break;
        case 3:
          existingPdfBytes = await fetch(_3raw).then((res) =>
            res.arrayBuffer()
          );
          break;
        case 4:
          existingPdfBytes = await fetch(_4raw).then((res) =>
            res.arrayBuffer()
          );
          break;
        default:
          console.log("no hay pdf");
          break;
      }

      // Resto del código que utiliza existingPdfBytes
      console.log("existingPdfBytes", existingPdfBytes);
      // ...
    } catch (error) {
      console.error(error);
    }

    // read document
    // console.log("existingPdfBytes", existingPdfBytes);
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

    form.getTextField("fecha").setText(solicitud[0].fecha, { size: 20 });
    form.getTextField("periodo").setText("enero-junio", { size: 20 });

    for (let i = 0; i < solicitud.length; i++) {
      const alumnosTotales =
        parseInt(solicitud[i].num_alumnos) + parseInt(solicitud[i].num_alumnas);
      form
        .getTextField("empresa" + (i + 1))
        .setText(solicitud[i].nombre_empresa + "\n" + solicitud[i].lugar);
      form.getTextField("objetivo" + (i + 1)).setText(solicitud[i].objetivo);
      form.getTextField("Numero" + (i + 1)).setText(alumnosTotales.toString());
      form.getTextField("Fecha" + (i + 1)).setText(solicitud[i].fecha);
      form
        .getTextField("carrera" + (i + 1))
        .setText(
          solicitud[i].semestre +
            "°" +
            solicitud[i].grupo +
            "\n" +
            solicitud[i].nombre_carrera,
          {
            size: 10,
          }
        );

      form
        .getTextField("solicitante" + (i + 1))
        .setText(
          solicitud[i].nombres +
            " " +
            solicitud[i].apellidoP +
            " " +
            solicitud[i].apellidoM
        );
      form
        .getTextField("asignatura" + (i + 1))
        .setText(solicitud[i].asignatura);
    }
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
    axios
      .post(apiUrl + "/obtener_solicitudes_visitas.php", { rango })
      .then((response) => {
        setSolicitudes(response.data);
        setReloadView(true);
      })
      .catch((error) => {
        console.error("Error al obtener las solicitudes:", error);
      });
  };
  const obtenerDiasOcupados = () => {
    fetch(apiUrl + "/obtener_agenda.php")
      .then((resp) => resp.json())
      .then((json) => {
        setDiasOcupados(json);
      });
  };

  const obtenerEmpresas = async () => {
    try {
      const response = await fetch(apiUrl + "/obtener_empresas.php");
      const json = await response.json();
      setEmpresas(json);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
    }
  };
  const eliminar = () => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar esta solicitud?"
    );
    if (confirmar) {
      const sendData = {
        id_visita: data.id_visita,
      };

      axios
        .delete(apiUrl + "/eliminar_solicitud_visita.php", { data: sendData })
        .then((result) => {
          console.log(result.status);
          if (result.status === 200) {
            setModal(false);
            setReloadView(true);
          } else {
            alert("Error al eliminar");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la solicitud:", error);
        });
    }
  };

  return (
    <>
      <div>
        <h1>Solicitudes de visitas</h1>
        <select
          className="form-control"
          id="tipoUser"
          value={rango}
          onChange={(e) => {
            setRango(e.target.value); // Actualizar el estado 'rango' con el valor seleccionado
            obtenerSolicitudes(e.target.value);
          }}
        >
          <option value="1">Este semestre</option>
          <option value="2">Todas</option>
        </select>
        <div className="contenedorSolicitudes">
          {solicitudes.length > 0 &&
            solicitudes
              .slice() // Hacemos una copia del array para no modificar el orden original
              .sort((a, b) => b.id_visita - a.id_visita) // Ordenamos descendientemente por id_visita
              .map((solicitud, i) => {
                const fechaOcupada = diasOcupados.some((dia) => {
                  const inicio = new Date(dia.inicio).getTime();
                  const fin = new Date(dia.fin).getTime();
                  const fecha = new Date(solicitud.fecha).getTime();
                  return fecha >= inicio && fecha <= fin;
                });
                return (
                  <div className="carta" key={solicitud.id_visita}>
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
                          <p>
                            Nombre de la empresa: {solicitud.nombre_empresa}
                          </p>
                          <p>
                            Nombre del usuario: {solicitud.nombres}{" "}
                            {solicitud.apellidoP} {solicitud.apellidoM}
                          </p>
                          {fechaOcupada ? (
                            <p id="fechaOcupada">
                              Fecha ocupada: {solicitud.fecha}
                            </p>
                          ) : (
                            <p>Fecha disponible: {solicitud.fecha}</p>
                          )}
                          <p>Hora salida:{solicitud.horaSalida}</p>
                          <p>Hora llegada:{solicitud.horaLlegada}</p>
                          <p>Asignatura: {solicitud.asignatura}</p>
                          <p>Objetivo: {solicitud.objetivo}</p>
                          <p>Grupo: {solicitud.grupo}</p>
                          <p>Semestre: {solicitud.semestre}</p>
                          <p>Numero de alumnos: {solicitud.num_alumnos}</p>
                          <p>Numero de alumnas: {solicitud.num_alumnas}</p>
                          <p>
                            Nombre de la carrera: {solicitud.nombre_carrera}
                          </p>
                          <p>Comentarios: {solicitud.comentarios} </p>

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
                              onClick={() => obtenerSolicitudesPDF(solicitud)}
                            >
                              {" "}
                              Imprimir{" "}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </div>
                );
              })}
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
            <Label for="estatus">Estatus:</Label>
            <br />
            <select
              name="estatus"
              id="estatus"
              className="select-estatus form-control"
              value={data.estatus}
              onChange={handleChange}
              required
            >
              <option value="En proceso">En proceso</option>
              <option value="Aceptada">Aceptada</option>
              <option value="Rechazada">Rechazada</option>
            </select>
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
              {Array.isArray(empresas) && empresas.length > 0 ? (
                empresas.map((empresa) => (
                  <option key={empresa.id_empresa} value={empresa.id_empresa}>
                    {`${empresa.nombre_empresa} (${empresa.lugar})`}
                  </option>
                ))
              ) : (
                <option value="">No hay empresas disponibles</option>
              )}
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
            <Label for="horaSalida">Hora salida</Label>
            <Input
              value={data.horaSalida}
              type="time"
              name="horaSalida"
              id="horaSalida"
              placeholder="horaSalida"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="horaLlegada">Hora llegada</Label>
            <Input
              value={data.horaLlegada}
              type="time"
              name="horaLlegada"
              id="horaLlegada"
              placeholder="horaLlegada"
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
          <FormGroup>
            <label for="comentarios">Comentarios</label>
            <textarea
              className="form-control"
              name="comentarios"
              id="comentarios"
              rows="3"
              value={data.comentarios}
              onChange={handleChange}
            ></textarea>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={actualizar}>
            Actualizar
          </Button>{" "}
          <Button color="danger" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button color="danger" onClick={eliminar}>
            Eliminar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default mostrarSolicitudes;
