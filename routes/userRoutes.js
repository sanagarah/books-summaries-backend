const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to handle signup
router.post("/signup", userController.signup);

// Route to handle login
router.post("/login", userController.login);

module.exports = router;
