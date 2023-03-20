import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Input } from "antd";
import axios from "axios";
import "./home.css";
export default function Home() {
  // // Variable que guarda los registros
  const [empresas, setEmpresas] = useState([]);
  // // Ciclo de vida: cuando el componente esta recien cargado
  const { id_usuario } = useSelector((state) => state.login);
  console.log(id_usuario);
  const refId_empresa = useRef("");

  const [data, setData] = useState({
    id_usuario: id_usuario,
    semestre: "1",
    grupo: "",
    objetivo: "",
    fecha: "",
    id_carrera: "1",
    num_alumnos: "",
    num_alumnas: "",
    asignatura: "",
  });
  useEffect(() => {
    obtenerEmpresas();
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    console.log(data);
    console.log(id_usuario);
  };

  const obtenerEmpresas = () => {
    fetch("http://localhost/ws-2/obtener_empresas.php")
      .then((resp) => resp.json())
      .then((json) => {
        //console.log(json);
        setEmpresas(json);
      });
  };

  const submitForm = (e) => {
    console.log(id_usuario);
    e.preventDefault();
    const sendData = {
      id_usuario: id_usuario,
      id_carrera: data.id_carrera,
      id_empresa: refId_empresa.current.value,
      semestre: data.semestre,
      grupo: data.grupo,
      objetivo: data.objetivo,
      fecha: data.fecha,
      num_alumnos: data.num_alumnos,
      num_alumnas: data.num_alumnas,
      asignatura: data.asignatura,
    };
    axios
      .post("http://localhost/ws-2/insertar_solicitud_visita.php", sendData)
      .then((result) => {
        console.log(result.data);
        if (result.data.isOk === "true") {
          alert("visita registrada");
          // setData({ ...data, [e.target.id]: "" });
          refId_empresa.current.value = "1";
        } else {
          alert("Error al registrar la visita");
        }
      });

    console.log(sendData);
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
                <label htmlFor="">Área a observar y objetivo</label>
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
                      defaultValue="1"
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
                    <Input
                      className="grupo"
                      id="grupo"
                      type="text"
                      maxLength={1}
                      pattern="[A-Z]"
                      onChange={handleChange}
                      value={data.grupo}
                    />
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
