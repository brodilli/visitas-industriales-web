import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container } from "reactstrap";
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

import "./mostrarUsers.css";

export default function MostrarUsers() {
  // Variable que guarda los registros
  const [registros, setRegistros] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const apiUrl = process.env.REACT_APP_API_URL;
  //variables del usuario
  const [data, setData] = useState({
    id_usuario: "",
    tipoUser: "Usuario",
    nombres: "",
    apellidoP: "",
    apellidoM: "",
    correo: "",
    contraseña: "",
  });
  const [reloadView, setReloadView] = useState(false);
  // Ciclo de vida: cuando el componente esta recien cargado
  useEffect(() => {
    obtenerRegistros();
    setReloadView(false);
  }, [reloadView]);

  const obtenerRegistros = () => {
    fetch(apiUrl + "/obtener_usuarios.php")
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        if (json.status === 200) {
          // El servidor respondió con éxito (código 200)
          console.log("Éxito:", json.data);
          setRegistros(json.data);
        } else {
          // El servidor respondió con un error
          console.error("Error:", json.error);
        }
      })
      .catch((error) => {
        // Error de red u otra excepción
        console.error("Error de red:", error);
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    console.log(data);
  };

  const abrirModalInsertar = (registro) => {
    setModalInsertar(true);
    setData(registro);
  };
  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };
  const actualizar = (e) => {
    e.preventDefault();
    const sendData = {
      id_usuario: data.id_usuario,
      tipoUser: data.tipoUser,
      nombres: data.nombres,
      apellidoP: data.apellidoP,
      apellidoM: data.apellidoM,
      correo: data.correo,
      contraseña: data.contraseña,
    };
    console.log(sendData);
    axios
      .post(apiUrl + "/actualizar_varios_usuarios.php", sendData)
      .then((result) => {
        console.log(result.data);
        if (result.data.isOk === true) {
          alert("Usuario actualizado");
          setModalInsertar(false);
          setReloadView(true);
        } else {
          alert("Error al actualizar usuario");
        }
      });
  };
  const eliminar = (id) => {
    const sendData = {
      id_usuario: id,
    };
    axios.post(apiUrl + "/eliminar_usuario.php", sendData).then((result) => {
      console.log(result.data);
      if (result.data.isOk === true) {
        alert("Usuario eliminado");
        setReloadView(true);
        setModalInsertar(false);
      } else {
        alert("Error al eliminar usuario");
      }
    });
  };
  return (
    <>
      <div className="contenedorMostrarUsers">
        <h1 className="titulo">Todos los usuarios</h1>
        <Container className="contenedor-mostrar-users">
          {/* <Button color="primary"> Agregar usuario </Button> */}
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo de usuario</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.id_usuario}>
                  <td>{registro.id_usuario}</td>
                  <td>{<p>{registro.tipoUser}</p>}</td>
                  <td>{registro.nombres}</td>
                  <td>{registro.apellidoP}</td>
                  <td>{registro.apellidoM}</td>
                  <td>{registro.correo}</td>
                  <td>
                    <Button
                      color="primary"
                      className="abrirModalInsertar"
                      onClick={() => abrirModalInsertar(registro)}
                    >
                      {" "}
                      Editar{" "}
                    </Button>
                  </td>

                  {/* <Button color="danger"> Eliminar </Button> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <h3>Editar Registro</h3>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="id_usuario">id_usuario</Label>
            <Input
              value={data.id_usuario}
              type="text"
              name="id_usuario"
              id="id_usuario"
              placeholder="id_usuario"
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="tipoUser">tipo de usuario</Label>
            <br />
            <select
              id="tipoUser"
              name="tipoUser"
              className="tipoUser"
              value={data.tipoUser}
              onChange={handleChange}
            >
              <option value="Usuario">Usuario</option>
              <option value="Administrador">Administrador</option>
              <option value="Administrador de recursos">
                Administrador de recursos materiales y servicios
              </option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="nombres">nombres</Label>
            <Input
              value={data.nombres}
              type="text"
              name="nombres"
              id="nombres"
              placeholder="nombres"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="apellidoP">apellido Paterno</Label>
            <Input
              value={data.apellidoP}
              type="text"
              name="apellidoP"
              id="apellidoP"
              placeholder="apellidoP"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="apellidoM">apellido Materno</Label>
            <Input
              value={data.apellidoM}
              type="text"
              name="apellidoM"
              id="apellidoM"
              placeholder="apellidoM"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="correo">correo</Label>
            <Input
              value={data.correo}
              type="text"
              name="correo"
              id="correo"
              placeholder="correo"
              onChange={handleChange}
            />
            <FormGroup>
              <label for="password">Contraseña</label>
              <Input
                value={data.contraseña}
                type="password"
                name="contraseña"
                id="contraseña"
                placeholder="contraseña"
                onChange={handleChange}
              />
            </FormGroup>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={actualizar}>
            Actualizar
          </Button>{" "}
          <Button color="warning" onClick={cerrarModalInsertar}>
            Cancelar
          </Button>
          <Button color="danger" onClick={() => eliminar(data.id_usuario)}>
            Eliminar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
