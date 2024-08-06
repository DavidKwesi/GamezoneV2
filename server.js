const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/GamezoneDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Ensure the unique index on username
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

// Generate random password
function generatePassword() {
    return crypto.randomBytes(8).toString('hex');
}

// Generate unique username
async function generateUniqueUsername(firstName, lastName) {
    let baseUsername = `${firstName}.${lastName}`;
    let username = baseUsername;
    let count = 1;
    while (await User.findOne({ username })) {
        username = `${baseUsername}${count}`;
        count++;
    }
    return username;
}

// Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gamezonespprt@gmail.com',
        pass: 'pqaj rxmd szao tnym'
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to Gamezone1!');
});

// API endpoint to invite a new user
app.post('/api/invite', async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        console.log('Received invite request:', req.body);

        const username = await generateUniqueUsername(firstName, lastName);
        console.log('Generated username:', username);

        const password = generatePassword();
        console.log('Generated password:', password);

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        });

        await newUser.save();
        console.log('User saved successfully:', newUser);

        const mailOptions = {
            from: 'gamezonespprt@gmail.com',
            to: email,
            subject: 'Welcome to Gamezone',
            text: `Hello ${firstName} ${lastName},\n\nYour account has been created.\nUsername: ${username}\nPassword: ${password}\n\nPlease log in and change your password.\n\nBest regards,\nGamezone Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                res.status(500).send({ message: 'Error sending email' });
            } else {
                console.log('Email sent successfully:', info.response);
                res.send({ message: 'Invitation sent successfully' });
            }
        });
    } catch (error) {
        console.log('Error in /api/invite:', error);
        res.status(500).send({ message: 'Error saving user' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid password' });
        }
        res.send({ message: 'Login successful', username: user.username });
    } catch (error) {
        console.log('Error in /api/login:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});
