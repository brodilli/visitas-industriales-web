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
