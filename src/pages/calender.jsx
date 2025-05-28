import React, { useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { DashboardContext } from "../contexts/DashboardContext";

const CalendarPage = () => {
  const { logs } = useContext(DashboardContext);

  const events = logs.map((log) => ({
    title: log.message,
    date: log.date,
  }));

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
        Activity Calendar
      </h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
};

export default CalendarPage;
