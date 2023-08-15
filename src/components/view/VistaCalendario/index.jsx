import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { useEffect } from "react";

const VistaCalendario = () => {
  const [events, setEvents] = useState([]);
  const obtenerEventos = () => {
    fetch("http://localhost/ws-2/obtener_agenda.php")
      .then((resp) => resp.json())
      .then((json) => {
        const eventos = json.map((evento) => ({
          id: evento.id_visita, // FullCalendar espera que el campo se llame 'id'
          title: evento.empresa,
          start: new Date(evento.fecha + "T" + evento.horaSalida), // Concatenar fecha y hora
          end: new Date(evento.fecha + "T" + evento.horaLlegada), // Concatenar fecha y hora
          color: evento.color,
          // ... (otros campos que quieras incluir)
          idVehiculo: evento.id_vehiculo, // Convertir la fecha a tipo Date
          fecha: evento.fecha, // Convertir la fecha a tipo Date
          horaSalida: evento.horaSalida,
          horaLlegada: evento.horaLlegada,
          empresa: evento.nombre_empresa,
          lugar: evento.lugar,
          maestroResponsable: evento.docente,
          numAlumnos: evento.num_alumnos,
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

  return (
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
    />
  );
};

export default VistaCalendario;
