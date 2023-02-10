import { createRoot } from "react-dom/client";

import Login from "./components/view/Login/Login";
import Home from "./components/view/Home/index";
import MostrarUsers from "./components/view/mostrarUsers/index";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" component={Home} />
        <Route exact path="/mostrarUsers" component={MostrarUsers} />
        <Route exact path="/" component={Login} />
        <Route path="*" element={"No encontrado"}></Route>
      </Routes>
    </Router>
  );
}
export default App;
