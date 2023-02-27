import React, { useState, useEffect } from "react";

export default function Home() {
  // // Variable que guarda los registros
  const [empresas, setEmpresas] = useState([]);
  const [nomEmpresas, setNomEmpresas] = useState([]);
  // // Ciclo de vida: cuando el componente esta recien cargado
  useEffect(() => {
    obtenerEmpresas();
  }, []);

  const obtenerEmpresas = () => {
    fetch("http://localhost/ws-2/obtener_empresas.php")
      .then((resp) => resp.json())
      .then((json) => {
        //console.log(json);
        setEmpresas(json);
      });
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Nueva solicitud de visita a empresas</h1>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="empresa">Empresa: </label>
          <input type="text" />
          <br />
          <label htmlFor="">Ciudad: </label>
          <input type="text" />
          <br />
          <label htmlFor="">Area a observar y objetivo</label>
          <input type="text" />
          <br />
          <label htmlFor="">Fecha de visita: </label>
          <input type="date" />
          <br />
          <label htmlFor="">Carrera: </label>
          <input type="text" />
          <br />
          <label htmlFor="">Número de alumnos: </label>
          <input type="number" />
          <br />
          <label htmlFor="">Asignatura: </label>
          <input type="text" />
          <br />
        </div>
      </div>
    </div>
  );
}
