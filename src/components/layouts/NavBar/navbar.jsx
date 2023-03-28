import { Fragment } from "react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import "./navbar.css";

const NavBar = () => {
  const { nombres } = useSelector((state) => state.login);
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
          </div>
          <div className="datos">
            <p id="p-nombre">{nombres}</p>
            <Link className="nav-link" id="link-setting" to="/editarUser">
              <SettingOutlined id="setting" title="Configuración" />
            </Link>
            <LogoutOutlined id="logout" onClick={cerrarSesion} title="Salir" />
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};
export default NavBar;
