import React from "react";
import { Button } from "reactstrap";

function Estatus({ estatus }) {
  let color;
  switch (estatus.toLowerCase()) {
    case "rechazada":
      color = "red";
      break;
    case "aceptada":
      color = "green";
      break;
    case "en proceso":
      color = "blue";
      break;
    default:
      color = "gray";
      break;
  }
  return (
    <Button disabled style={{ backgroundColor: color }}>
      {estatus}
    </Button>
  );
}

export default Estatus;
