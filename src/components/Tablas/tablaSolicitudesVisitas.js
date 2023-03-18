import React from "react";

export default function Tabla(props) {
  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">id_usuario</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellido Paterno</th>
            <th scope="col">Apellido Materno</th>
            <th scope="col">Correo</th>
          </tr>
        </thead>
        <tbody>
          {props.registros.map((item, i) => (
            <tr key={i}>
              <td>{item.id_usuario}</td>
              <td>{item.nombres}</td>
              <td>{item.apellidoP}</td>
              <td>{item.apellidoM}</td>
              <td>{item.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
