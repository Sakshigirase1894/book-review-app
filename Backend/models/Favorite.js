const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  title: String,
  author: String,
  image: String,
});

module.exports = mongoose.model("Favorite", favoriteSchema);