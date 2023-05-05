import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";

const Agenda = () => {
  const [events, setEvents] = useState([
    {
      title: "Meeting with Jane",
      start: "2023-05-10T10:00:00",
      end: "2023-05-10T11:00:00",
    },
    {
      title: "Lunch with John",
      start: "2023-05-12T12:30:00",
      end: "2023-05-12T13:30:00",
    },
    {
      title: "Call with Sarah",
      start: "2023-05-15T15:00:00",
      end: "2023-05-15T16:00:00",
    },
  ]);

  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateClick = (arg) => {
    setEditingEvent({
      title: "",
      start: arg.date,
      end: arg.date,
    });
  };

  const handleEventClick = (arg) => {
    alert(`Clicked on event "${arg.event.title}"`);
  };

  const handleEventInputChange = (event) => {
    setEditingEvent({
      ...editingEvent,
      [event.target.name]: event.target.value,
    });
  };

  const handleEventFormSubmit = (event) => {
    event.preventDefault();

    setEvents([...events, editingEvent]);
    setEditingEvent(null);
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
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        locale={esLocale}
        height={"90vh"}
      />
      {editingEvent && (
        <form onSubmit={handleEventFormSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={editingEvent.title}
            onChange={handleEventInputChange}
          />
          <input
            type="datetime-local"
            name="start"
            value={editingEvent.start.toISOString().slice(0, -8)}
            onChange={handleEventInputChange}
          />
          <input
            type="datetime-local"
            name="end"
            value={editingEvent.end.toISOString().slice(0, -8)}
            onChange={handleEventInputChange}
          />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default Agenda;
