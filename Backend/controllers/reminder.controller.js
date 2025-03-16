const Reminder = require("../models/reminder.model");
const { scheduleReminder } = require("../utils/agendaJobSchedular");

exports.createReminder = async (req, res) => {
    try {
        const { email, title, description, dateTime } = req.body;

        if (!email || !title || !description || !dateTime) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const reminder = await Reminder.create({ email, title, description, dateTime });

        // Schedule the reminder email
        await scheduleReminder(reminder);

        res.status(201).json({
            success: true,
            message: "Reminder created successfully",
            reminder
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find({ email: req.user.email });
        res.status(200).json({
            success: true,
            messsage: 'All reminders fetched',
            reminders
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteReminder = async (req, res) => {
    try {
        const { reminderId } = req.params;
        if(!reminderId){
            return res.status(400).json({
                success: false,
                message: "reminderId is required"
            });
        }

        const reminder = await Reminder.findByIdAndDelete(reminderId);
        if (!reminder) {
            return res.status(404).json({ 
                success: false,
                message: "Reminder not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Reminder deleted successfully",
            reminder
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: err.message
        });
    }
};
