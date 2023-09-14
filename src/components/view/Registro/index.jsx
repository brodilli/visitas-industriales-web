import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
const Registro = () => {
  const [data, setData] = useState({
    tipoUser: "Usuario",
    nombres: "",
    apellidoP: "",
    apellidoM: "",
    correo: "",
    contraseña: "",
  });
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [reloadView, setReloadView] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    console.log(data);
  };
  useEffect(() => {
    console.log("useEffect");
    setReloadView(false);
  }, [reloadView]);
  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      tipoUser: data.tipoUser,
      nombres: data.nombres,
      apellidoP: data.apellidoP,
      apellidoM: data.apellidoM,
      correo: data.correo,
      contraseña: data.contraseña,
    };
    axios
      .post(serverUrl + "/insertar_registro.php", sendData)
      .then((result) => {
        console.log(result.data);
        if (result.data.isOk === "true") {
          alert("Usuario registrado");
          setData({
            tipoUser: "Usuario",
            nombres: "",
            apellidoP: "",
            apellidoM: "",
            correo: "",
            contraseña: "",
          });
        }
        if (result.data.isOk === "existe") {
          alert("Correo ya registrado");
        }
        if (result.data.isOk === "false") {
          alert("Error al registrar usuario");
        }
        setReloadView(true);
      });
    console.log(sendData);
  };
  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-sm-12 mt-3">
            <h3>Nuevo usuario</h3>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="tipoUser">Tipo de usuario: </label>
                <select
                  className="form-control"
                  id="tipoUser"
                  onChange={handleChange}
                  value={data.tipoUser}
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Administrador de recursos">
                    Administrador de recursos materiales y servicios
                  </option>
                  <option value="Usuario Consulta">
                    Usuario que puede consultar el calendario
                  </option>
                </select>
                <label htmlFor="nombre">Nombres: </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombres"
                  placeholder="Nombre"
                  onChange={handleChange}
                  value={data.nombres}
                />
                <label htmlFor="apellidoP">Apellido Paterno: </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidoP"
                  placeholder="Apellido Paterno"
                  onChange={handleChange}
                  value={data.apellidoP}
                />
                <label htmlFor="apellidoM">Apellido Materno: </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidoM"
                  placeholder="Apellido Materno"
                  onChange={handleChange}
                  value={data.apellidoM}
                />
                <label htmlFor="correo">Correo: </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  placeholder="Correo"
                  onChange={handleChange}
                  value={data.correo}
                />
                <label htmlFor="contraseña">Contraseña: </label>
                <input
                  type="password"
                  className="form-control"
                  id="contraseña"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  value={data.contraseña}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Registrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Registro;
