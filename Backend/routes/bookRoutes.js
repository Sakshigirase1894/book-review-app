const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

// GET ALL BOOKS
router.get("/", async (req, res) => {
  try {
    let {
      search = "",
      category = "all",
      page = 1,
      limit = 12,
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = {};

    // SEARCH
    if (search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    // CATEGORY FILTER
    if (category !== "all") {
      query.category = category;
    }

    // TOTAL BOOKS
    const totalBooks = await Book.countDocuments(query);

    // FETCH BOOKS
    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      books,
    });
  } catch (error) {
    console.error("❌ Get Books Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;