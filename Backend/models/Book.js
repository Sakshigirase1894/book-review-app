console.log("NEW SEED FILE RUNNING");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    // 📚 Basic Info
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    // 🖼️ Book Cover
    image: {
      type: String,
      default: "https://via.placeholder.com/300x450",
    },

    // ⭐ Rating System
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },

    // 💬 Reviews count (optional summary field)
    reviewsCount: {
      type: Number,
      default: 0,
    },

    // 📖 Book Content (for details page)
    story: {
      type: String,
      default: "No story available.",
    },

    moral: {
      type: String,
      default: "No moral available.",
    },

    // 🌟 Featured book flag
    featured: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true, // createdAt + updatedAt automatically
  }
);

module.exports = mongoose.model("Book", bookSchema);