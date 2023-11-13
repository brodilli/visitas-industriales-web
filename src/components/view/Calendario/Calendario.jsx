import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [idVisita, setIdVisita] = useState("");
  const [idVehiculo, setIdVehiculo] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [horaLlegada, setHoraLlegada] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [lugar, setLugar] = useState("");
  const [maestroResponsable, setMaestroResponsable] = useState("");
  const [numAlumnos, setNumAlumnos] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  window.addEventListener("popstate", () => {
    cerrarSesion();
  });

  const obtenerEventos = () => {
    fetch(apiUrl + "/obtener_agenda.php")
      .then((resp) => resp.json())
      .then((json) => {
        const eventos = json.map((evento) => ({
          id: evento.id_visita, // FullCalendar espera que el campo se llame 'id'
          title: evento.empresa,
          start: new Date(evento.fecha + "T" + evento.horaSalida), // Concatenar fecha y hora
          end: new Date(evento.fecha + "T" + evento.horaLlegada), // Concatenar fecha y hora
          color: evento.color,
          // ... (otros campos que quieras incluir)
          idVehiculo: evento.id_vehiculo,
          fecha: evento.fecha, // Convertir la fecha a tipo Date
          horaSalida: evento.horaSalida,
          horaLlegada: evento.horaLlegada,
          empresa: evento.empresa,
          lugar: evento.lugar,
          maestroResponsable: evento.docente,
          numAlumnos: evento.numAlumnos,
        }));
        setEvents(eventos);
        console.log(eventos);
      })
      .catch((error) => {
        console.error("Error al obtener eventos:", error);
      });
  };
  useEffect(() => {
    obtenerEventos();
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const obtenerVisita = () => {
    if (idVisita === "") {
      alert("Ingrese un id de visita");
    } else {
      console.log("idVisita: " + idVisita);
      const sendData = {
        id_visita: idVisita,
      };
      axios
        .get(apiUrl + "/obtener_solicitud_visita.php", {
          params: sendData,
        })
        .then((response) => {
          const visita = response.data[0];
          console.log(response.data);
          setFecha(visita.fecha);
          setHoraSalida(visita.horaSalida);
          setHoraLlegada(visita.horaLlegada);
          setEmpresa(visita.nombre_empresa);
          setLugar(visita.lugar);
          setMaestroResponsable(
            visita.nombres + " " + visita.apellidoP + " " + visita.apellidoM
          );
          setNumAlumnos(
            parseInt(visita.num_alumnos) + parseInt(visita.num_alumnas)
          );
          setShowModal(true);
        })
        .catch((error) => {
          console.error("Error al obtener la visita:", error);
        });
    }
  };

  const handleEventClick = (eventClickInfo) => {
    // Obtén el evento clicado desde eventClickInfo.event y configura el estado
    setIdVisita(eventClickInfo.event.id);
    setFecha(eventClickInfo.event.extendedProps.fecha);
    setHoraSalida(eventClickInfo.event.extendedProps.horaSalida);
    setHoraLlegada(eventClickInfo.event.extendedProps.horaLlegada);
    setEmpresa(eventClickInfo.event.title);
    setLugar(eventClickInfo.event.extendedProps.lugar);
    setMaestroResponsable(
      eventClickInfo.event.extendedProps.maestroResponsable
    );
    setNumAlumnos(eventClickInfo.event.extendedProps.numAlumnos);
    setIdVehiculo(eventClickInfo.event.extendedProps.idVehiculo);

    console.log(eventClickInfo.event);
    setShowModal(true);
  };

  const handleAddEvent = () => {
    const sendData = {
      id_visita: idVisita,
    };
    axios.post(apiUrl + "/no_repetir_agenda.php", sendData).then((response) => {
      const cont = response.data.count;
      if (cont === "0") {
        if (idVehiculo === "") {
          setShowModal(false);
          alert("Ingrese un id de vehiculo");
        }
        const newEvent = {
          idVisita: idVisita,
          idVehiculo: idVehiculo,
          fecha: fecha,
          horaSalida: horaSalida,
          horaLlegada: horaLlegada,
          empresa: empresa,
          lugar: lugar,
          docente: maestroResponsable,
          numAlumnos: numAlumnos,
          title: idVisita,
        };
        const colors = ["blue", "red", "green", "yellow", "purple", "orange"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        setEvents([...events, newEvent]);

        fetch(apiUrl + "/insertar_agenda.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_visita: idVisita,
            id_vehiculo: idVehiculo,
            fecha: fecha,
            horaSalida: horaSalida,
            horaLlegada: horaLlegada,
            empresa: empresa,
            lugar: lugar,
            docente: maestroResponsable,
            numAlumnos: numAlumnos,
            color: randomColor,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        setShowModal(false);
      } else {
        alert("La visita ya se encuentra en la agenda");
        setShowModal(false);
      }
    });
  };

  return (
    <div>
      <label>Ingresar ID_VISITA:</label>
      <input
        type="text"
        value={idVisita}
        onChange={(e) => setIdVisita(e.target.value)}
      />
      <Button variant="secondary" onClick={obtenerVisita}>
        Consultar
      </Button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventClick={handleEventClick}
        locale={esLocale}
        height={"90vh"}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>id_solicitud</Form.Label>
              <Form.Control type="text" value={idVisita} disabled />
            </Form.Group>
            <Form.Group controlId="idVehiculo">
              <Form.Label>ID Vehiculo</Form.Label>
              <Form.Control
                type="text"
                value={idVehiculo}
                onChange={(e) => setIdVehiculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="fecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="text" value={fecha} disabled />
            </Form.Group>
            <Form.Group controlId="horaSalida">
              <Form.Label>Hora Salida</Form.Label>
              <Form.Control type="text" value={horaSalida} disabled />
            </Form.Group>
            <Form.Group controlId="horaLlegada">
              <Form.Label>Hora aprox. de Llegada a la empresa</Form.Label>
              <Form.Control type="text" value={horaLlegada} disabled />
            </Form.Group>
            <Form.Group controlId="empresa">
              <Form.Label>Empresa</Form.Label>
              <Form.Control type="text" value={empresa} disabled />
            </Form.Group>
            <Form.Group controlId="lugar">
              <Form.Label>Lugar</Form.Label>
              <Form.Control type="text" value={lugar} disabled />
            </Form.Group>

            <Form.Group controlId="maestroResponsable">
              <Form.Label>Maestro Responsable</Form.Label>
              <Form.Control type="text" value={maestroResponsable} disabled />
            </Form.Group>
            <Form.Group controlId="numAlumnos">
              <Form.Label>Numero de Alumnos</Form.Label>
              <Form.Control type="text" value={numAlumnos} disabled />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Agenda;
