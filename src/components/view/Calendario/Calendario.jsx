// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import esLocale from "@fullcalendar/core/locales/es";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// const Agenda = () => {
//   const [events, setEvents] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [eventTitle, setEventTitle] = useState("");
//   const [eventStart, setEventStart] = useState("");
//   const [eventEnd, setEventEnd] = useState("");
//   const [idVisita, setIdVisita] = useState("");
//   const [fecha, setFecha] = useState("");
//   const [horaSalida, setHoraSalida] = useState("");
//   const [horaLlegada, setHoraLlegada] = useState("");
//   const [empresa, setEmpresa] = useState("");
//   const [maestroResponsable, setMaestroResponsable] = useState("");
//   const [numAlumnos, setNumAlumnos] = useState("");

//   const cerrarSesion = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   window.addEventListener("popstate", () => {
//     cerrarSesion();
//   });

//   const obtenerEventos = () => {
//     fetch("http://localhost/ws-2/obtener_agenda.php")
//       .then((resp) => resp.json())
//       .then((json) => {
//         const eventos = json.map((evento) => ({
//           title: evento.titulo,
//           start: new Date(evento.inicio), // Convertir la fecha a tipo Date
//           end: new Date(evento.fin), // Convertir la fecha a tipo Date
//         }));
//         setEvents(eventos);
//       });
//   };

//   useEffect(() => {
//     obtenerEventos();
//   }, []);
//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const obtenerVisita = (id_visita) => {
//     fetch("http://localhost/ws-2/obtener_visita.php?id=" + id_visita)
//       .then((resp) => resp.json())
//       .then((json) => {
//         const visita = json[0];
//         setEventTitle(visita.empresa);
//         setEventStart(visita.inicio);
//         setEventEnd(visita.fin);

//         setShowModal(true);
//       });
//   };

//   const handleDateSelect = (selectInfo) => {
//     setShowModal(true);
//     setEventTitle("");
//     setEventStart(selectInfo.startStr);
//     setEventEnd(selectInfo.endStr);
//   };

//   const handleAddEvent = () => {
//     const newEvent = {
//       title: eventTitle,
//       start: new Date(eventStart),
//       end: new Date(eventEnd),
//     };

//     const eventsOnSameDay = events.filter((event) => {
//       const eventDate = new Date(event.start);
//       return (
//         eventDate.getFullYear() === newEvent.start.getFullYear() &&
//         eventDate.getMonth() === newEvent.start.getMonth() &&
//         eventDate.getDate() === newEvent.start.getDate()
//       );
//     });

//     if (eventsOnSameDay.length === 0) {
//       newEvent.color = "green";
//     } else if (eventsOnSameDay.length === 1) {
//       newEvent.color = "blue";
//     } else if (eventsOnSameDay.length === 2) {
//       newEvent.color = "orange";
//     } else if (eventsOnSameDay.length >= 3) {
//       newEvent.color = "red";
//     }

//     setEvents([...events, newEvent]);

//     fetch("http://localhost/ws-2/insertar_agenda.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         titulo: eventTitle,
//         inicio: eventStart,
//         fin: eventEnd,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });

//     setShowModal(false);
//   };

//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,timeGridDay",
//         }}
//         events={events}
//         locale={esLocale}
//         height={"90vh"}
//         selectable={true}
//         selectMirror={true}
//         dayMaxEvents={true}
//         select={handleDateSelect}
//       />
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Agregar evento</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="eventTitle">
//               <Form.Label>id_solicitud</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={idVisita}
//                 onChange={(e) => setIdVisita(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="eventStart">
//               <Form.Label>Inicio</Form.Label>
//               <Form.Control type="text" value={eventStart} disabled />
//             </Form.Group>
//             <Form.Group controlId="eventEnd">
//               <Form.Label>Fin</Form.Label>
//               <Form.Control type="text" value={eventEnd} disabled />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancelar
//           </Button>
//           <Button variant="primary" onClick={handleAddEvent}>
//             Agregar
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Agenda;

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
    fetch("http://localhost/ws-2/obtener_agenda.php")
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

    fetch("http://localhost/ws-2/insertar_agenda.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_visita: eventTitle,
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
