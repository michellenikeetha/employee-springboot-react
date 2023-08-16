import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentService from '../services/AppointmentService';

const localizer = momentLocalizer(moment);

function AppointmentCalendar() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointment, setAppointment] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    AppointmentService.getAppointment().then(res => {
      setAppointment(res.data);
    });
  }, []);

  const handleSlotSelect = (slotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    // Use the name data (e.g., name) as needed
    // Reset selectedSlot and name after form submission
    setSelectedSlot(null);
    setName('');
  };

  const handleEventClick = (event) => {
    window.location.href = `/day-view/${event.start.toISOString()}`;
  };

  return (
    <div className="h-screen">
      <div className="mt-4 h-full">
        <Calendar
          localizer={localizer}
          events={appointment}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectEvent={handleEventClick}
          onSelectSlot={handleSlotSelect}
        />
      </div>
      {selectedSlot && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Enter Name</h2>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-300 rounded mr-2"
                  onClick={() => setSelectedSlot(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentCalendar;
