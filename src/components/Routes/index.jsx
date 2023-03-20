import React from "react";
import Login from "../view/Login/Login";
import Home from "../../components/view/Home/index";
import Registo from "../../components/view/Registro/index";
import MostrarUsers from "../../components/view/mostrarUsers/index";
import EditarUsers from "../../components/view/editarUsers/index";
import MostrarSolicitudes from "../view/mostrarSolicitudesVisitas/index";
import MostrarSolicitudesUsuario from "../view/MostrarSolicitudVisitaUsuario";
import RegistroEmpresa from "../RegistroEmpresa";
import NavBar from "../../components/layouts/NavBar/navbar";
import NavBarUser from "../layouts/NavBar/navBarUser";
import { ProtectedRoute } from "../../components/ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function Rutas() {
  const { login, nombres, tipoUser } = useSelector((state) => state.login);
  console.log(nombres);

  return (
    <Router>
      {tipoUser === "Usuario" ? <NavBarUser /> : <NavBar />}
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route element={<ProtectedRoute login={login} />}>
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
        </Route>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />
        <Route path="*" element={"No encontrado"}></Route>
      </Routes>
    </Router>
  );
}
export default Rutas;
