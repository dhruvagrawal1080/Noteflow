const Agenda = require("agenda");
const Reminder = require("../models/reminder.model");
const mailSender = require("./mailSender");
require('dotenv').config();

const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

// Define the job for sending emails
agenda.define("send reminder email", async (job) => {
    const { email, title, description, reminderId } = job.attrs.data;

    // Check if the reminder still exists
    const reminder = await Reminder.findById(reminderId);
    if (!reminder || reminder.isSent) return;

    await mailSender(email, `Reminder: ${title}`, `Don't forget: ${description}`);

    // Mark as sent
    await Reminder.findByIdAndUpdate(reminderId, { isSent: true });

    // After sending the email, delete the job
    await job.remove();
});

// Function to schedule reminders
const scheduleReminder = async (reminder) => {
    await agenda.schedule(reminder.dateTime, "send reminder email", {
        email: reminder.email,
        title: reminder.title,
        description: reminder.description,
        reminderId: reminder._id,
    });
};

// Start Agenda
(async function () {
    await agenda.start();
})();

module.exports = { agenda, scheduleReminder };