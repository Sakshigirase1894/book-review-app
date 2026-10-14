const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const Review = require("../models/Review");

// ================= EMAIL CONFIG =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= POST REVIEW =================
router.post("/", async (req, res) => {
  try {
    const {
      bookId,
      bookTitle,
      username,
      email,
      rating,
      comment,
    } = req.body;

    // Save Review
    const review = new Review({
      bookId,
      bookTitle,
      username,
      email,
      rating,
      comment,
    });

    await review.save();

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your book review 📚",
      html: `
        <h2>Hello ${username} 👋</h2>

        <p>Thank you for reviewing <b>${bookTitle}</b>.</p>

        <p><b>Your Rating:</b> ⭐ ${rating}/5</p>

        <p><b>Your Review:</b></p>

        <p>${comment}</p>

        <br>

        <p>Keep reading with <b>ReadToRise 📖</b></p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      review,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: error.message,
    });
  }
});

// ================= GET REVIEWS =================
router.get("/:bookId", async (req, res) => {
  try {

    const reviews = await Review.find({
      bookId: req.params.bookId,
    }).sort({ createdAt: -1 });

    res.status(200).json(reviews);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
    });

  }
});

module.exports = router;