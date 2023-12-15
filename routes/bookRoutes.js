const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Route to create a new book
router.post("/", bookController.createBook);

// Route to update a book by ID
router.put("/:id", bookController.updateBook);

module.exports = router;
