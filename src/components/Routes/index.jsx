import React from "react";
import Login from "../view/Login/Login";
import Home from "../../components/view/Home/index";
import Registo from "../../components/view/Registro/index";
import MostrarUsers from "../../components/view/mostrarUsers/index";
import EditarUsers from "../../components/view/editarUsers/index";
import RegistroEmpresa from "../RegistroEmpresa";
import NavBar from "../../components/layouts/NavBar/navbar";
import { ProtectedRoute } from "../../components/ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function Rutas() {
  const { login, nombres } = useSelector((state) => state.login);
  console.log(nombres);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route element={<ProtectedRoute login={login} />}>
          <Route exact path="/mostrarUsers" element={<MostrarUsers />} />
          <Route exact path="/registro" element={<Registo />} />
          <Route exact path="/editarUser" element={<EditarUsers />} />
          <Route exact path="/registroEmpresa" element={<RegistroEmpresa />} />
        </Route>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />
        <Route path="*" element={"No encontrado"}></Route>
      </Routes>
    </Router>
  );
}
export default Rutas;
