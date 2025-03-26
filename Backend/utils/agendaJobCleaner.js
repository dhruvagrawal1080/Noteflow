const Agenda = require("agenda");
const Reminder = require("../models/reminder.model");
const Note = require("../models/note.model");
require("dotenv").config();

const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

// 🗑️ Delete expired reminders
agenda.define("delete expired reminders", async () => {
    console.log("Running reminder cleanup job...");
    const now = new Date();

    // Delete expired reminders (past date-time)
    const deletedReminders = await Reminder.deleteMany({ dateTime: { $lt: now } });
    console.log(`Deleted ${deletedReminders.deletedCount} expired reminders`);

    // Delete completed Agenda jobs
    const deletedJobs = await agenda.cancel({ nextRunAt: { $lt: now } });
    console.log(`Deleted ${deletedJobs} completed agenda jobs`);
});

// 🗑️ Delete trashed notes older than 30 days
agenda.define("delete old trashed notes", async () => {
    console.log("Running trashed notes cleanup job...");

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Delete notes where `deletedAt` is older than 30 days
    const deletedNotes = await Note.deleteMany({ deletedAt: { $lt: thirtyDaysAgo } });
    console.log(`Deleted ${deletedNotes.deletedCount} trashed notes`);

    // Delete completed Agenda jobs
    const deletedJobs = await agenda.cancel({ nextRunAt: { $lt: new Date() } });
    console.log(`Deleted ${deletedJobs} completed agenda jobs`);
});

// ⏰ Start and Schedule Cleanup Jobs
(async function () {
    await agenda.start();

    // Ensure no duplicate jobs
    await agenda.cancel({ name: "delete expired reminders" });
    await agenda.cancel({ name: "delete old trashed notes" });

    // Run every hour for expired reminders
    await agenda.every("1 hour", "delete expired reminders");

    // Run every day at midnight for trashed notes
    await agenda.every("1 day", "delete old trashed notes");
})();
