import React, { useState, useEffect } from "react";
import { Card, Col, Button } from "antd";

const mostrarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const imprimir = (solicitud) => {
    console.log(solicitud);
  };

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
      {solicitudes.length > 0 &&
        solicitudes.map((solicitud, i) => (
          <Col span={8}>
            <Card title={"id: " + solicitud.id_visita}>
              <div className="informacion">
                <p></p>
                <p>Nombre de la empresa: {solicitud.nombre_empresa}</p>
                <p>
                  Nombre del usuario: {solicitud.nombres} {solicitud.apellidoP}{" "}
                  {solicitud.apellidoM}
                </p>
                <p>Fecha: {solicitud.fecha}</p>
                <p>Asignatura: {solicitud.asignatura}</p>
                <p>Objetivo: {solicitud.objetivo}</p>
                <p>Grupo: {solicitud.grupo}</p>
                <p>Semestre: {solicitud.semestre}</p>
                <p>Numero de alumnos: {solicitud.num_alumnos}</p>
                <p>Numero de alumnas: {solicitud.num_alumnas}</p>
                <p>Nombre de la carrera: {solicitud.nombre_carrera}</p>
                <Button onClick={() => imprimir(solicitud)}> Imprimir </Button>
              </div>
            </Card>
          </Col>
        ))}
    </div>
  );
};
export default mostrarSolicitudes;
