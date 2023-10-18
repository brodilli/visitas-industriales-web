// import React, { useRef } from "react";
import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../redux/reducers/userReducer";

export default function Login() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = apiUrl + "/login2.php";

  const dispatch = useDispatch();
  const [user, setUser] = useState({ correo: "", contraseña: "" });
  // const olvidoContraseña = () => {
  //   alert("Olvido contraseña");
  // };
  let navigate = useNavigate();
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const sendData = {
      correo: user.correo,
      contraseña: user.contraseña,
    };

    // console.log(sendData);

    axios.post(url, JSON.stringify(sendData)).then((result) => {
      const responseData = result.data; // La respuesta es un objeto JSON

      if (responseData.Status === "200") {
        dispatch(
          setLogin({
            login: true,
            nombres: responseData.data.nombres,
            apellidoP: responseData.data.apellidoP,
            apellidoM: responseData.data.apellidoM,
            correo: user.correo,
            contraseña: user.contraseña,
            id_usuario: responseData.data.id_usuario,
            tipoUser: responseData.data.tipoUser,
            numSesion: responseData.data.numSesion,
            numTelefono: responseData.data.numTelefono,
          })
        );
        console.log(responseData.data.id_usuario);
        const sendData = {
          id_usuario: responseData.data.id_usuario,
          numSesion: parseInt(responseData.data.numSesion) + 1,
        };
        console.log(sendData);
        axios
          .post(apiUrl + "/contador_sesion_usuarios.php", sendData)
          .then((result) => {
            // Almacena nombres e id_usuario en el almacenamiento local
            localStorage.setItem("nombres", result.data.nombres);
            localStorage.setItem("id_usuario", result.data.id_usuario);

            // Imprime los nombres en la consola
            console.log(localStorage.getItem("nombres"));

            // Corrige la comparación de numSesion (asumiendo que numSesion es un número)
            if (result.data.numSesion === 0) {
              navigate("/cambiarContraseña");
            } else {
              console.log(result.data.tipoUser);
              if (result.data.tipoUser === "Administrador de recursos") {
                navigate("/Calendario");
              } else if (result.data.tipoUser === "Usuario Consulta") {
                navigate("/vistaCalendario");
              } else {
                navigate("/home");
              }
            }

            // Imprime el objeto JSON completo en la consola
            console.log(result.data);
          })
          .catch((error) => {
            alert("Usuario o contraseña incorrectos");
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="contenedor">
      <div className="imagen">
        <img
          src="https://cdguzman.tecnm.mx/itcg/pluginfile.php/1/theme_moove/logo/1662120580/Imagen11.png"
          alt=""
        />
      </div>
      <div className="login ">
        <form onSubmit={submitForm}>
          <div className="container">
            <div className="card pt-2" id="info">
              <div className="texto">
                <p>
                  Sitio web para la administración <br /> de Visitas
                  Industriales
                </p>
              </div>
            </div>
            <div className="login-card">
              <div className="card pt-2">
                <div className="card-header">
                  <UserOutlined id="icono" />
                  <h3 className="titulo">Iniciar sesión</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Correo electrónico"
                      typs="correo"
                      name="correo"
                      onChange={handleChange}
                      value={user.correo}
                    />
                  </div>
                  <div className="form-group pt-2 pb-2 ">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Contraseña"
                      typs="contraseña"
                      name="contraseña"
                      onChange={handleChange}
                      value={user.contraseña}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    id="btn-login"
                  >
                    Acceder
                  </button>
                  {/* <a onClick={olvidoContraseña} visibility={false}>
                    ¿Olvidaste tu contraseña?
                  </a> */}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
