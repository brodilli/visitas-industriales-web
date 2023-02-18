import React from "react";
import Login from "../view/Login/Login";
import Home from "../../components/view/Home/index";
import Registo from "../../components/view/Registro/index";
import MostrarUsers from "../../components/view/mostrarUsers/index";
import NavBar from "../../components/layouts/NavBar/navbar";
import { ProtectedRoute } from "../../components/ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function Rutas() {
  const { login } = useSelector((state) => state.login);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <ProtectedRoute login={login}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/mostrarUsers"
          element={
            <ProtectedRoute login={login}>
              <MostrarUsers />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/registro"
          element={
            <ProtectedRoute login={login}>
              <Registo />
            </ProtectedRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />
        <Route path="*" element={"No encontrado"}></Route>
      </Routes>
    </Router>
  );
}
export default Rutas;
