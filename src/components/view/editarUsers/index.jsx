import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
const editarUsers = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const {
    nombres,
    apellidoP,
    apellidoM,
    correo,
    contraseña,
    id_usuario,
    numTelefono,
  } = useSelector((state) => state.login);

  console.log(correo);
  const nombreRef = useRef("");
  const apellidoPRef = useRef("");
  const apellidoMRef = useRef("");
  const correoRef = useRef("");
  const contraseñaRef = useRef("");
  const numTelefonoRef = useRef("");
  useEffect(() => {
    nombreRef.current.value = nombres;
    apellidoPRef.current.value = apellidoP;
    apellidoMRef.current.value = apellidoM;
    correoRef.current.value = correo;
    contraseñaRef.current.value = contraseña;
    numTelefonoRef.current.value = numTelefono;
  }, [
    nombreRef,
    apellidoPRef,
    apellidoMRef,
    correoRef,
    contraseñaRef,
    numTelefonoRef,
  ]);

  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      id_usuario: id_usuario,
      nombres: nombreRef.current.value,
      apellidoP: apellidoPRef.current.value,
      apellidoM: apellidoMRef.current.value,
      correo: correoRef.current.value,
      contraseña: contraseñaRef.current.value,
      numTelefono: numTelefonoRef.current.value,
    };
    console.log(sendData);
    axios
      .post(serverUrl + "/actualizar_usuarios.php", sendData)
      .then((result) => {
        console.log(result.data);
        if (result.data.isOk === true) {
          alert("Usuario actualizado");
        } else {
          alert("Error al actualizar usuario");
        }
      });
  };
  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-sm-12 mt-3">
            <h3>Editar usuario</h3>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="nombre">Nombres: </label>
                <input
                  ref={nombreRef}
                  type="text"
                  className="form-control"
                  id="nombres"
                  // placeholder={nombres}
                  // onChange={handleChange}
                  value={nombreRef.current.value}
                />
                <label htmlFor="apellidoP">Apellido Paterno: </label>
                <input
                  ref={apellidoPRef}
                  type="text"
                  className="form-control"
                  id="apellidoP"
                  placeholder="Apellido Paterno"
                  // onChange={handleChange}
                  value={apellidoPRef.current.value}
                />
                <label htmlFor="apellidoM">Apellido Materno: </label>
                <input
                  ref={apellidoMRef}
                  type="text"
                  className="form-control"
                  id="apellidoM"
                  placeholder="Apellido Materno"
                  // onChange={handleChange}
                  value={apellidoMRef.current.value}
                />
                <label htmlFor="correo">Correo: </label>
                <input
                  ref={correoRef}
                  type="email"
                  className="form-control"
                  id="correo"
                  placeholder="Correo"
                  // onChange={handleChange}
                  value={correoRef.current.value}
                />
                <label htmlFor="contraseña">Contraseña: </label>
                <input
                  ref={contraseñaRef}
                  type="password"
                  className="form-control"
                  id="contraseña"
                  placeholder="Contraseña"
                  // onChange={handleChange}
                  value={contraseñaRef.current.value}
                />
                <label htmlFor="numTelefono">Numero de telefono: </label>
                <input
                  ref={numTelefonoRef}
                  type="text"
                  className="form-control"
                  id="numTelefono"
                  placeholder="Numero de telefono"
                  // onChange={handleChange}
                  value={numTelefonoRef.current.value}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default editarUsers;
