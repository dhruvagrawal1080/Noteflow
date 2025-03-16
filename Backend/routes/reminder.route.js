const express = require("express");
const { createReminder, getReminders, deleteReminder } = require("../controllers/reminder.controller");
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post("/createReminder", auth, createReminder);
router.get("/getReminders", auth, getReminders);
router.delete("/deleteReminder/:reminderId", auth, deleteReminder);

module.exports = router;
