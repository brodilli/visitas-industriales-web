import React from "react";
import Login from "./components/view/Login/Login";
import Home from "./components/view/Home/index";
import Registo from "./components/view/Registro/index";
import MostrarUsers from "./components/view/mostrarUsers/index";
import NavBar from "./components/layouts/NavBar/navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/mostrarUsers" element={<MostrarUsers />} />
          <Route exact path="/registro" element={<Registo />} />
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={"No encontrado"}></Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
