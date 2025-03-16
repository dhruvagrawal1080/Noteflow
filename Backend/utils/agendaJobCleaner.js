const Agenda = require("agenda");
const Reminder = require("../models/reminder.model");
require('dotenv').config();

const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

agenda.define("delete expired reminders", async () => {
    console.log("Running cleanup job...");
    const now = new Date();

    // Delete expired reminders
    const deletedReminders = await Reminder.deleteMany({ dateTime: { $lt: now } });
    console.log(`Deleted ${deletedReminders.deletedCount} expired reminders`);

    // Delete completed agenda jobs
    const deletedJobs = await agenda.cancel({ nextRunAt: { $lt: now } });
    console.log(`Deleted ${deletedJobs} completed agenda jobs`);
});

// Schedule cleanup job to run every hour
(async function () {
    await agenda.start();
    // First, clear any existing jobs with this name (to avoid duplication)
    await agenda.cancel({ name: "delete expired reminders" });
    await agenda.every("1 hour", "delete expired reminders");
})();
