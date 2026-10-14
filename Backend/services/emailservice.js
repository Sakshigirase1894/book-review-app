const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendWelcomeEmail = async (email) => {
    console.log("📧 Email received by service:", email);

    if (!email) {
        throw new Error("Recipient email is missing");
    }

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to ReadToRise 📚",
        html: `
            <div style="font-family: Arial, sans-serif;">
                <h2>Welcome to ReadToRise 📚</h2>
                <p>Thank you for joining our Book Review Application.</p>
                <p>Happy Reading! 😊</p>
            </div>
        `,
    });

    console.log("✅ Welcome email sent to:", email);
};

module.exports = sendWelcomeEmail;