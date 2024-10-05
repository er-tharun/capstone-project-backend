// appointment.js
const express = require('express');
const sgMail = require('@sendgrid/mail'); // For using SendGrid
const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Use environment variable for API key

// Send Appointment Email
router.post('/', async (req, res) => {
    const { date, slot } = req.body;

    const msg = {
        to: 'recipient_email@example.com', // Replace with the recipient's email
        from: 'your_email@gmail.com',       // Replace with your verified SendGrid email
        subject: 'New Appointment Booking',
        text: `Appointment booked on ${date} for the ${slot} time slot.`,
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email Error:', error.response ? error.response.body : error);
        res.status(500).json({ message: 'Error sending email.', error });
    }
});

module.exports = router;
