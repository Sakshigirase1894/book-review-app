const express = require("express");
const router = express.Router();
const sendWelcomeEmail = require("../services/emailservice");
router.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        await sendWelcomeEmail(email);

        res.status(200).json({
            success: true,
            message: "Welcome email sent successfully!",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send email",
        });
    }
});

module.exports = router;