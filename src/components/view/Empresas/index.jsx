import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container } from "reactstrap";
import { Modal } from "reactstrap";

export default function MostrarEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [modalInsertar] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [data, setData] = useState({
    id_empresa: "",
    nombre_empresa: "",
    // Agrega otras propiedades de empresa según tu estructura
  });

  const [reloadView, setReloadView] = useState(false);

  useEffect(() => {
    obtenerEmpresas();
    setReloadView(false);
  }, [reloadView]);

  const obtenerEmpresas = () => {
    fetch(apiUrl + "/obtener_empresas.php")
      .then((resp) => resp.json())
      .then((json) => {
        if (json.status === 200) {
          setEmpresas(json.data);
        } else {
          console.error("Error:", json.error);
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.id]: e.target.value });
  // };

  //   const abrirModalInsertar = (empresa) => {
  //     setModalInsertar(true);
  //     setData(empresa);
  //   };

  //   const cerrarModalInsertar = () => {
  //     setModalInsertar(false);
  //   };

  // Ajusta las funciones actualizar y eliminar según tu estructura de datos de empresas

  //   const actualizar = (e) => {
  //     e.preventDefault();
  //     // Implementa la lógica de actualización de empresas aquí
  //   };

  //   const eliminar = (id_empresa) => {
  //     // Implementa la lógica de eliminación de empresas aquí
  //   };

  return (
    <>
      <div className="contenedorMostrarEmpresas">
        <h1 className="titulo">Todas las empresas</h1>
        <Container className="contenedor-mostrar-empresas">
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre de la empresa</th>
                {/* Agrega otras columnas según tu estructura de datos */}
              </tr>
            </thead>
            <tbody>
              {empresas.map((empresa) => (
                <tr key={empresa.id_empresa}>
                  <td>{empresa.id_empresa}</td>
                  <td>{empresa.nombre_empresa}</td>
                  {/* Agrega otras columnas según tu estructura de datos */}
                  <td>
                    {/* <Button
                      color="primary"
                      onClick={() => abrirModalInsertar(empresa)}
                    >
                      Editar
                    </Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
      <Modal isOpen={modalInsertar}>
        {/* ... Resto del modal, ajusta según la estructura de datos de empresas */}
      </Modal>
    </>
  );
}
