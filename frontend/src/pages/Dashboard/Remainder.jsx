import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegCalendar, FaRegClock, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { createReminder, getReminders, removeReminder } from "../../services/operations/reminderAPI";

const Remainder = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);
  const { reminders } = useSelector((state) => state.reminder);

  const [reminderData, setReminderData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setReminderData({ ...reminderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reminderData.title || !reminderData.description) {
      toast.error("Please enter both title and description.");
      return;
    }

    if (!reminderData.date || !reminderData.time) {
      toast.error("Please select both date and time.");
      return;
    }

    // Combine date and time
    const combinedDateTime = new Date(
      `${reminderData.date}T${reminderData.time}:00`
    );

    dispatch(createReminder(token, {
      email: user.email,
      title: reminderData.title,
      description: reminderData.description,
      dateTime: combinedDateTime.toISOString() // Convert to UTC format
    }));

    setReminderData({
      title: "",
      description: "",
      date: "",
      time: "",
    })
  };

  const formatDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);

    // Format date as "Jan 15, 2025"
    const date = dateObj.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short', // 'short' gives "Jan", 'long' gives "January"
      year: 'numeric',
    });

    // Format time as "10:00 AM"
    const time = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return { date, time };
  };

  useEffect(() => {
    if (!reminders || !(reminders.length > 0)) {
      dispatch(getReminders(token));
    }
  }, [])


  return (
    <div className="h-[calc(100vh-3.5rem)] flex justify-center items-center">

      <div className="h-full w-full bg-gray-100 overflow-auto py-8">

        {/* Reminder Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">

          <h1 className="text-2xl mb-6 font-bold">Set New Reminder</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="space-y-1">
              <label className="block text-sm text-neutral-700" htmlFor='remainder-title'>Reminder Title</label>
              <input
                type="text"
                id='remainder-title'
                name='title'
                value={reminderData.title}
                onChange={handleChange}
                placeholder="Enter reminder title"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-neutral-200 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm text-neutral-700" htmlFor='remainder-description'>Description</label>
              <textarea
                id='remainder-description'
                name='description'
                onChange={handleChange}
                value={reminderData.description}
                placeholder="Enter reminder description"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-neutral-200 outline-none h-24 resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4 -mt-2">

              <div className="space-y-1">
                <label className="block text-sm text-neutral-700" htmlFor='remainder-date'>Date</label>
                <input
                  type="date"
                  id='remainder-date'
                  name='date'
                  value={reminderData.date}
                  onChange={handleChange}
                  min={new Date().toLocaleDateString("en-CA")} // Set minimum date to today
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-neutral-200 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm text-neutral-700" htmlFor='remainder-time'>Time</label>
                <input
                  type="time"
                  id='remainder-time'
                  name='time'
                  value={reminderData.time}
                  onChange={handleChange}
                  min={reminderData.date === new Date().toISOString().split("T")[0] ? new Date().toLocaleTimeString("en-GB", { hour12: false }).slice(0, 5) : "00:00"}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-neutral-200 outline-none"
                />
              </div>

            </div>

            <button type='submit' className="w-full bg-[#2563EB] text-white py-2 px-4 rounded-md font-semibold cursor-pointer">
              Set Reminder
            </button>

          </form>

        </div>

        {/* Upcoming Reminders */}
        <div className="max-w-2xl mx-auto mt-8">

          <h2 className="text-xl mb-4 font-semibold">Upcoming Reminders</h2>

          <div className="space-y-4">

            {
              reminders && reminders.filter(reminder => reminder.isSent === false).length > 0 ?
                (
                  reminders.filter(reminder => reminder.isSent === false).map(reminder => (
                    <div key={reminder._id} className="bg-white p-4 rounded-lg border shadow-sm">

                      <div className="flex justify-between items-start">

                        <div className='overflow-auto'>
                          <h3 className="text-lg font-bold">{reminder.title}</h3>
                          <p className="text-sm text-neutral-600 mt-1">{reminder.description}</p>

                          <div className="flex items-center space-x-3 mt-2 text-sm text-neutral-500">
                            <span className='flex items-center gap-2'><FaRegCalendar />{formatDateTime(reminder.dateTime).date}</span>
                            <span className='flex items-center gap-2'><FaRegClock />{formatDateTime(reminder.dateTime).time}</span>
                          </div>

                        </div>

                        <button
                          className="text-neutral-500 hover:text-neutral-700 cursor-pointer"
                          onClick={() => dispatch(removeReminder(token, reminder._id))}
                        >
                          <FaTrashCan />
                        </button>

                      </div>

                    </div>
                  ))
                ) :
                (
                  <p className="text-gray-500 text-center text-2xl">No reminders found</p>
                )
            }





          </div>

        </div>

      </div>
      
    </div>
  )
}

export default Remainder