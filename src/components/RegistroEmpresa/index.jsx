import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
const RegistroEmpresa = () => {
  const [data, setData] = useState({
    nombre_empresa: "",
    lugar: "",
    nombre_contacto: "",
    correo_contacto: "",
    telefono_contacto: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;
  const [reloadView, setReloadView] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    console.log(data);
  };
  useEffect(() => {
    setReloadView(false);
  }, [reloadView]);

  const submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      nombre_empresa: data.nombre_empresa,
      lugar: data.lugar,
      nombre_contacto: data.nombre_contacto,
      correo_contacto: data.correo_contacto,
      telefono_contacto: data.telefono_contacto,
    };
    axios.post(apiUrl + "/insertar_empresa.php", sendData).then((result) => {
      console.log(result.data);
      if (result.data.msj === "Registro exitoso") {
        alert("Empresa registrada");
      }
      setData({
        nombre_empresa: "",
        lugar: "",
        nombre_contacto: "",
        correo_contacto: "",
        telefono_contacto: "",
      });
    });
    setReloadView(true);
    console.log(sendData);
  };
  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-sm-12 mt-3">
            <h3>Nueva empresa</h3>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="nombre">Nombre: </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre_empresa"
                  placeholder="Nombre"
                  onChange={handleChange}
                  value={data.nombre_empresa}
                  required
                />
                <label htmlFor="lugar">Ciudad: </label>
                <input
                  type="text"
                  className="form-control"
                  id="lugar"
                  placeholder="ciudad"
                  onChange={handleChange}
                  value={data.lugar}
                  required
                />
                <label htmlFor="nombre_contacto">Nombre de contacto: </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre_contacto"
                  placeholder="Nombre del contacto"
                  onChange={handleChange}
                  value={data.nombre_contacto}
                  required
                />
                <label htmlFor="correo_contacto">Correo de contacto: </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo_contacto"
                  placeholder="Correo"
                  onChange={handleChange}
                  value={data.correo_contacto}
                  required
                />
                <label htmlFor="telefono_contacto">
                  Telefono del contacto:{" "}
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefono_contacto"
                  placeholder="Telefono"
                  onChange={handleChange}
                  value={data.telefono_contacto}
                  required
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
export default RegistroEmpresa;
