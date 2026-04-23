const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sanad_db'
});

db.connect((err) => {
    if (err) {
        console.error(' Database connection error:', err);
        return;
    }
    console.log(' Connected to Sanad Database successfully!');
});

// Volunteer Page Endpoint 
app.post('/submit-volunteer', (req, res) => {
    const { firstName, lastName, gender, dob, email, phone, skills } = req.body;

    const interests = req.body.interest ? req.body.interest.toString() : '';
    const availability = req.body.availability ? req.body.availability.toString() : '';
    const languages = req.body.language ? req.body.language.toString() : '';

    const sql = `INSERT INTO volunteers 
        (first_name, last_name, gender, dob, email, phone, interests, skills, availability, languages) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [firstName, lastName, gender, dob, email, phone, interests, skills, availability, languages];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(' Error during insertion:', err);
            res.status(500).send('Sorry, an error occurred.');
        } else {
            res.send(`
                <script>
                    alert('Success! Your registration has been submitted.');
                    window.location.href = 'http://127.0.0.1:5500/index.html';
                </script>
            `);
        }
    });
});

// Contact Us Page Endpoint
app.post('/submit-contact', (req, res) => {
    const { firstName, lastName, gender, dob, language, email, phone, message } = req.body;

    const sql = `INSERT INTO contact_messages 
        (first_name, last_name, gender, dob, language, email, phone, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [firstName, lastName, gender, dob, language, email, phone, message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(' Error saving message:', err);
            res.status(500).send('Error');
        } else {
            res.send(`
                <script>
                    alert('Success! Your message has been sent.');
                    window.location.href = 'http://127.0.0.1:5500/index.html';
                </script>
            `);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Sanad Server is running at http://localhost:${PORT}`);
});