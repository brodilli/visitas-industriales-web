import React, { useState, useEffect } from "react";
import { Card, Col, Button } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const mostrarSolicitudesUsuario = () => {
  const { id_usuario } = useSelector((state) => state.login);
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const imprimir = (solicitud) => {
    console.log(solicitud);
  };

  const obtenerSolicitudes = () => {
    const sendData = {
      id_usuario: id_usuario,
    };
    axios
      .post(
        "http://localhost/ws-2/obtener_solicitud_visita_usuario.php",
        sendData
      )
      .then((result) => {
        console.log(result.data);
        setSolicitudes(result.data);
      });
    console.log(sendData);
  };

  return (
    <div>
      <h1>Solicitudes de visitas</h1>
      {solicitudes.length > 0 &&
        solicitudes.map((solicitud, i) => (
          <Col key={i} span={8}>
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
export default mostrarSolicitudesUsuario;
