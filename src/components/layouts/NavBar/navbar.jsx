import { Fragment } from "react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="/home">
            Visitas Industriales
          </Link> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" id="link" to="/home">
                Home
              </Link>
              <Link className="nav-link" id="link" to="/registro">
                Registro
              </Link>
              <Link className="nav-link" id="link" to="/mostrarUsers">
                Mostrar Usuarios
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <section>
        <Outlet></Outlet>
      </section>
    </Fragment>
  );
};
export default NavBar;
