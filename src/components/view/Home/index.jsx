import React, { useState, useEffect } from "react";
import Tabla from "../../TablaUsers";

export default function Home() {
  // Variable que guarda los registros
  const [registros, setRegistros] = useState([]);
  // Ciclo de vida: cuando el componente esta recien cargado
  useEffect(() => {
    obtenerRegistros();
  }, []);

  const obtenerRegistros = () => {
    fetch("http://localhost/ws-2/obtener_usuarios.php")
      .then((resp) => resp.json())
      .then((json) => {
        //console.log(json);
        setRegistros(json);
      });
  };
  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Todos los usuarios</h1>
      </div>
      <div class="row">
        <div class="col-sm-12">
          {// Si hay registros, se muestran en la tabla
          registros.length > 0 ? (
            <Tabla registros={registros} />
          ) : (
            <h2>No hay registros</h2>
          )}
        </div>
      </div>
    </div>
  );
}
