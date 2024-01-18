import React from "react";
import Login from "../view/Login/Login";
import Home from "../../components/view/Home/index";
import VisitaRegistro from "../../components/view/solicitudVisita/index";
import Registo from "../../components/view/Registro/index";
import MostrarUsers from "../../components/view/mostrarUsers/index";
import EditarUsers from "../../components/view/editarUsers/index";
import MostrarSolicitudes from "../view/mostrarSolicitudesVisitas/index";
import MostrarSolicitudesUsuario from "../view/MostrarSolicitudVisitaUsuario";
import ExportarSolicitudes from "../view/Export/index";
import RegistroEmpresa from "../RegistroEmpresa";
import Calendario from "../view/Calendario/Calendario";
import MostrarEmpresas from "../view/Empresas";
import PrimerInicio from "../view/primerInicio/index";
import NavBar from "../../components/layouts/NavBar/navbar";
import NavBarUser from "../layouts/NavBar/navBarUser";
import NavBarCalendar from "../layouts/NavBar/navBarCalendar";
import VistaCalendario from "../view/VistaCalendario";
import NavBarCalendarVista from "../layouts/NavBar/navBarCalendarVista";
import { ProtectedRoute } from "../../components/ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function Rutas() {
  const { login, nombres, tipoUser } = useSelector((state) => state.login);
  console.log(nombres);

  const nav = () => {
    if (login === true) {
      if (tipoUser === "Usuario") {
        return <NavBarUser />;
      } else if (tipoUser === "Administrador de recursos") {
        return <NavBarCalendar />;
      } else if (tipoUser === "Usuario Consulta") {
        return <NavBarCalendarVista />;
      } else {
        return <NavBar />;
      }
    } else {
      return null;
    }
  };

  return (
    <Router>
      {nav()}

      <Routes>
        <Route element={<ProtectedRoute login={login} />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/mostrarUsers" element={<MostrarUsers />} />
          <Route exact path="/registro" element={<Registo />} />
          <Route exact path="/editarUser" element={<EditarUsers />} />
          <Route exact path="/registroEmpresa" element={<RegistroEmpresa />} />
          <Route
            exact
            path="/mostrarSolicitudes"
            element={<MostrarSolicitudes />}
          />
          <Route
            exact
            path="/mostrarSolicitudesUsuario"
            element={<MostrarSolicitudesUsuario />}
          />
          <Route
            exact
            path="/exportarSolicitudes"
            element={<ExportarSolicitudes />}
          />
          <Route exact path="/calendario" element={<Calendario />} />
          <Route exact path="/vistaCalendario" element={<VistaCalendario />} />
          <Route exact path="/cambiarContraseña" element={<PrimerInicio />} />
          <Route exact path="/mostrarEmpresas" element={<MostrarEmpresas />} />
          <Route exact path="/visitaRegistro" element={<VisitaRegistro />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default Rutas;
