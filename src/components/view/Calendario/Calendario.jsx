import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");

  const obtenerEventos = () => {
    fetch("http://localhost/ws-2/obtener_uso_vehiculos.php")
      .then((resp) => resp.json())
      .then((json) => {
        const eventos = json.map((evento) => ({
          title: evento.titulo,
          start: evento.inicio,
          end: evento.fin,
        }));
        setEvents(eventos);
      });
  };

  useEffect(() => {
    obtenerEventos();
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDateSelect = (selectInfo) => {
    setShowModal(true);
    setEventTitle("");
    setEventStart(selectInfo.startStr);
    setEventEnd(selectInfo.endStr);
  };

  const handleAddEvent = () => {
    const newEvent = {
      title: eventTitle,
      start: new Date(eventStart),
      end: new Date(eventEnd),
    };
    setEvents([...events, newEvent]);

    fetch("http://localhost/ws-2/insertar_uso_vehiculos.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: eventTitle,
        inicio: eventStart,
        fin: eventEnd,
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
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        locale={esLocale}
        height={"90vh"}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="eventStart">
              <Form.Label>Inicio</Form.Label>
              <Form.Control type="text" value={eventStart} disabled />
            </Form.Group>
            <Form.Group controlId="eventEnd">
              <Form.Label>Fin</Form.Label>
              <Form.Control type="text" value={eventEnd} disabled />
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
