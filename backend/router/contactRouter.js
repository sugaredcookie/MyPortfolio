const express = require("express");
const { createContact, getMessages } = require("../controller/contactController.js");

const router = express.Router();

router.post("/contact", createContact);
router.get("/", getMessages);

module.exports = router;