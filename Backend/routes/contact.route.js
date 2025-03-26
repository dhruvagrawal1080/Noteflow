const express = require("express");
const { contactUsController } = require("../controllers/contact.controller");

const router = express.Router();

router.post("/contact", contactUsController);

module.exports = router;