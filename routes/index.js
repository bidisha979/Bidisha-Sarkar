require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("./users");
const nodemailer = require("nodemailer");

router.get('/', function (req, res) {
  res.render('index');
});

router.post("/", async function (req, res) {
  try {
    const userData = new User({
      name: req.body.name,
      email: req.body.email,
      message: req.body.msg,
    });

    await userData.save();
    sendEmail(req.body.email, req.body.name);

    res.send('<script>alert("Form submitted successfully! Check your email."); window.location.href="/";</script>');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving message");
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendEmail(userEmail, userName) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Thank You for Contacting Me!",
    text: `Hello ${userName},\n\nThank you for reaching out! I have received your message and will get back to you soon.\n\nBest regards,\nBidisha Sarkar`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = router;

