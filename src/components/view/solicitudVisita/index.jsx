import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Input } from "antd";
import axios from "axios";
import "./home.css";

export default function VisitaRegistro() {
  const [empresas, setEmpresas] = useState([]);
  const [reloadView, setReloadView] = useState(false);
  const { id_usuario } = useSelector((state) => state.login);
  const apiUrl = process.env.REACT_APP_API_URL;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const refId_empresa = useRef("");

  const [data, setData] = useState({
    id_usuario: id_usuario,
    semestre: "1",
    grupo: "A",
    objetivo: "",
    fecha: "",
    horaLlegada: "",
    horaSalida: "",
    id_carrera: "1",
    num_alumnos: "",
    num_alumnas: "",
    asignatura: "",
    acompanante: "",
  });

  window.addEventListener("popstate", () => {
    cerrarSesion();
  });

  useEffect(() => {
    const fetchData = async () => {
      await obtenerEmpresas();
      setReloadView(false);
      // Realizar otras acciones después de obtener las empresas
    };

    fetchData();
  }, [reloadView]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const obtenerEmpresas = async () => {
    try {
      const response = await fetch(apiUrl + "/obtener_empresas.php");
      const json = await response.json();

      if (json.status === 200) {
        setEmpresas(json.data); // Actualizar el estado con los datos
      } else {
        console.error("Error al obtener las empresas.");
      }
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      id_usuario: id_usuario,
      id_carrera: data.id_carrera,
      id_empresa: refId_empresa.current.value,
      semestre: data.semestre,
      grupo: data.grupo,
      objetivo: data.objetivo,
      fecha: data.fecha,
      horaSalida: data.horaSalida,
      horaLlegada: data.horaLlegada,
      num_alumnos: data.num_alumnos,
      num_alumnas: data.num_alumnas,
      asignatura: data.asignatura,
      acompanante: data.acompanante,
    };
    axios
      .post(apiUrl + "/insertar_solicitud_visita.php", sendData)
      .then((result) => {
        console.log(result.data);
        if (result.data.isOk === true) {
          alert("Visita registrada");
          setReloadView(true);
        } else {
          if (result.data.isOk === "false") {
            alert("Error al registrar la visita");
          } else if (result.data.isMore === "406") {
            alert(
              "Usted no puede realizar otra solicitud de visita, ya que alcanzó el límite de solicitudes permitidas por grupo, semestre y materia."
            );
          }
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 mt-3">
          <h3>Nueva solicitud de visita a empresas</h3>
        </div>

        <div className="card-home">
          <div className="card-body">
            <div className="form-group">
              <form onSubmit={submitForm}>
                <label htmlFor="empresa">Empresa: </label>
                <select
                  ref={refId_empresa}
                  name="empresa"
                  id="id_empresa"
                  className="select-empresa form-control"
                  value={refId_empresa.current.value}
                  required
                  onChange={handleChange}
                >
                  {Array.isArray(empresas) && empresas.length > 0 ? (
                    empresas.map((empresa) => (
                      <option
                        key={empresa.id_empresa}
                        value={empresa.id_empresa}
                      >
                        {`${empresa.nombre_empresa} (${empresa.lugar})`}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay empresas disponibles</option>
                  )}
                </select>
                <label>Área a observar y objetivo</label>
                <Input
                  type="text"
                  id="objetivo"
                  className="form-control"
                  onChange={handleChange}
                  value={data.objetivo}
                  required
                />
                <label htmlFor="">Fecha de visita: </label>
                <Input
                  type="date"
                  className="form-control"
                  id="fecha"
                  onChange={handleChange}
                  value={data.fecha}
                  required
                />
                <label htmlFor="">Hora de salida</label>
                <Input
                  type="time"
                  className="form-control"
                  id="horaSalida"
                  onChange={handleChange}
                  value={data.horaSalida}
                  required
                />
                <label htmlFor="">Hora de llegada</label>
                <Input
                  type="time"
                  className="form-control"
                  id="horaLlegada"
                  onChange={handleChange}
                  value={data.horaLlegada}
                  required
                />

                <label htmlFor="">Carrera: </label>
                <select
                  defaultChecked="1"
                  id="id_carrera"
                  className="form-control"
                  onChange={handleChange}
                  value={data.id_carrera}
                  required
                >
                  <option value="1">Arquitectura</option>
                  <option value="2">Contador Público</option>
                  <option value="3">Ingeniería Informática</option>
                  <option value="4">Ingeniería Ambiental</option>
                  <option value="5">Ingeniería Mecánica</option>
                  <option value="6">Ingeniería Electrica</option>
                  <option value="7">
                    Ingeniería en Sistemas Computacionales
                  </option>
                  <option value="8">Ingeniería Industrial</option>
                  <option value="9">Ingeniería Electrónica</option>
                  <option value="10">Ingeniería en Gestión Empresarial</option>
                </select>
                <div className="triple">
                  <div>
                    <label htmlFor="">Semestre: </label>
                    <select
                      name="semestre"
                      id="semestre"
                      onChange={handleChange}
                      value={data.semestre}
                      required
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
                  </div>
                  <div>
                    <label htmlFor="">Grupo: </label>
                    <select
                      name="grupo"
                      id="grupo"
                      value={data.grupo}
                      onChange={handleChange}
                      required
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                      <option value="H">H</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="">Número de alumnos: </label>
                    <Input
                      id="num_alumnos"
                      type="number"
                      min={"1"}
                      className="num_alumnos "
                      onChange={handleChange}
                      value={data.num_alumnos}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="">Número de alumnas: </label>
                    <Input
                      id="num_alumnas"
                      type="number"
                      min={"1"}
                      className="num_alumnas"
                      onChange={handleChange}
                      value={data.num_alumnas}
                      required
                    />
                  </div>
                </div>
                <label htmlFor="">Asignatura: </label>
                <Input
                  id="asignatura"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={data.asignatura}
                  required
                />
                <label htmlFor="">Acompañante: </label>
                <Input
                  id="acompanante"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={data.acompanante}
                />
                <button type="submit" className="btn btn-primary mt-3">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
