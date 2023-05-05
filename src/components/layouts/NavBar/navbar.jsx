import { Fragment } from "react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar } from "react-bootstrap";

import "./navbar.css";

const NavBar = () => {
  const { nombres } = useSelector((state) => state.login);
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Fragment>
      <Navbar expand="md">
        <div className="container-fluid">
          <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
          <Navbar.Collapse id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" id="home" to="/home">
                Home
              </Link>
              <Link className="nav-link" id="registro" to="/registro">
                Registro
              </Link>
              <Link className="nav-link" id="mostrarUsers" to="/mostrarUsers">
                Mostrar Usuarios
              </Link>
              <Link
                className="nav-link"
                id="registroEmpresa"
                to="/registroEmpresa"
              >
                Registro Empresa
              </Link>
              <Link
                className="nav-link"
                id="mostrarSolicitudes"
                to="/mostrarSolicitudes"
              >
                Mostrar solicitudes de visitas
              </Link>
              <Link
                className="nav-link"
                id="exportarSolicitudes"
                to="/exportarSolicitudes"
              >
                Exportar solicitudes de visitas
              </Link>
            </div>
            <div className="datos">
              <p id="p-nombre">{nombres}</p>
              <Link className="nav-link" id="link-setting" to="/editarUser">
                <SettingOutlined id="setting" title="Configuración" />
              </Link>
              <LogoutOutlined
                id="logout"
                onClick={cerrarSesion}
                title="Salir"
              />
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};
export default NavBar;
