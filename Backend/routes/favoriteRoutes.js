const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

// GET all favorites
router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD favorite
router.post("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    const exists = await Favorite.findOne({ bookId });
    if (exists) return res.json({ message: "Already in favorites" });

    const fav = new Favorite({
      bookId,
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
    });

    await fav.save();
    res.json(fav);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE favorite
router.delete("/:bookId", async (req, res) => {
  try {
    await Favorite.findOneAndDelete({ bookId: req.params.bookId });
    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;