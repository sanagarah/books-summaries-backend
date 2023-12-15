const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  cover: { type: String, required: true }, // URL to the cover image
  summary: { type: String, required: true }, // The summary as text
});

module.exports = mongoose.model("Book", BookSchema);
