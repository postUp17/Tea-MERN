const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/test", (req, res) => res.send("test test test!"));

module.exports = router;
