const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // To serve HTML, CSS, and JS files

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/webseries', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
    email: String,
    subscribed: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);

// Subscribe Endpoint
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    const user = new User({ email });
    await user.save();
    
    // Send Confirmation Email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password'     // Replace with your email password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Subscription Confirmation',
        text: 'Thank you for subscribing to our web series!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Subscription successful!');
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
