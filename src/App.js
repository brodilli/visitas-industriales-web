import { createRoot } from "react-dom/client";

import Login from "./components/view/Login/Login";
import Home from "./components/view/Home/index";
import MostrarUsers from "./components/view/mostrarUsers/index";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/mostrarUsers" element={<MostrarUsers />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={"No encontrado"}></Route>
      </Routes>
    </Router>
  );
}
export default App;
