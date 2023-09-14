import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const editarUsers = () => {
  const { contraseña, id_usuario, numTelefono, tipoUser } = useSelector(
    (state) => state.login
  );
  let navigate = useNavigate();
  const contraseñaRef = useRef("");
  const numTelefonoRef = useRef("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    contraseñaRef.current.value = contraseña;
    numTelefonoRef.current.value = numTelefono;
  }, [contraseñaRef, numTelefonoRef]);

  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      id_usuario: id_usuario,
      contraseña: contraseñaRef.current.value,
      numTelefono: numTelefonoRef.current.value,
    };
    console.log(sendData);
    axios.post(serverUrl + "/primer_inicio.php", sendData).then((result) => {
      console.log(result.data);
      if (result.data.isOk === true) {
        alert("Usuario actualizado");
        if (tipoUser === "Usuario Consulta") {
          navigate("/vistaCalendario");
        }
        if (tipoUser === "Administrador de recursos") {
          navigate("/Calendario");
        }
        if (tipoUser === "Administrador") {
          navigate("/Calendario");
        }
        if (tipoUser === "Usuario") {
          navigate("/Home");
        }
        // else {
        //   navigate("/home");
        // }
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
            <h3>Cambiar contraseña</h3>
            <h3>Agregar número celular (Opcional)</h3>
          </div>
          <div className="card">
            <label htmlFor="contraseña">Contraseña: </label>
            <input
              ref={contraseñaRef}
              type="password"
              className="form-control"
              id="contraseña"
              placeholder="Contraseña"
              value={contraseñaRef.current.value}
            />
            <label htmlFor="numTelefono">Número de telefono: </label>
            <input
              ref={numTelefonoRef}
              type="text"
              className="form-control"
              id="numTelefono"
              placeholder="Numero de telefono"
              value={numTelefonoRef.current.value}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};
export default editarUsers;
