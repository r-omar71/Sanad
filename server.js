const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use("/", express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Volunteer Page 
 
// --- VOLUNTEER REGISTRATION (POST SECTION) ---
function addUser(fName, lName, gender, dob, email, phone, interests, skills, availability, languages, res) {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "sanad_db"
    });

    db.connect((err) => {
        if (err) {
            console.error(err);
            return res.send("error");
        }

        let sql = `INSERT INTO volunteers 
        (first_name, last_name, gender, dob, email, phone, interests, skills, availability, languages) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [fName, lName, gender, dob, email, phone, interests, skills, availability, languages], (err, result) => {
            db.end();

            if (err) {
                console.error(err);
                return res.send("error");
            }

            console.log("1 record added to Sanad Volunteers table");
            res.send("success");
        });
    });
}

app.post('/submit-volunteer', (req, res) => {
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const email = req.body.email;
    const phone = req.body.phone;
    const skills = req.body.skills;

    const interests = req.body.interest ? req.body.interest.toString() : '';
    const availability = req.body.availability ? req.body.availability.toString() : '';
    const languages = req.body.language ? req.body.language.toString() : '';

    if (fName && lName && gender && dob && email && phone && skills) {
        addUser(fName, lName, gender, dob, email, phone, interests, skills, availability, languages, res);
    } else {
        res.send("error");
    }
});

// --- DATA DISPLAY (GET SECTION) ---
function getVolunteers(res) {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "", 
        database: "sanad_db"
    });

    db.connect((err) => {
        if (err) throw err;

        let sql = "SELECT * FROM volunteers";

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
            db.end();
        });
    });
}

app.get('/view-volunteers', (req, res) => {
    getVolunteers(res);
});






// Contact Us Page 

// --- CONTACT MESSAGES (POST SECTION) ---

function addMessage(fName, lName, gender, dob, language, email, phone, message) {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "", 
        database: "sanad_db"
    });

    db.connect((err) => {
        if (err) {
            console.error(err);
            return res.send("error");
        }

        let sql = `INSERT INTO contact_messages 
        (first_name, last_name, gender, dob, language, email, phone, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [fName, lName, gender, dob, language, email, phone, message], (err, result) => {
            db.end();

            if (err) {
                console.error(err);
                return res.send("error");
            }

            console.log("Message saved!");
            res.send("success");
        });
    });
}

app.post('/submit-contact', (req, res) => {
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const language = req.body.language;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    if (fName && lName && gender && dob && email && phone && message) {
        addMessage(fName, lName, gender, dob, language, email, phone, message, res);
    } else {
        res.send("error");
    }
});

// --- VIEW MESSAGES (GET SECTION) ---

function getMessages(res) {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "", 
        database: "sanad_db"
    });

    db.connect((err) => {
        if (err) throw err;
        let sql = "SELECT * FROM contact_messages";
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result);
            db.end();
        });
    });
}

app.get('/view-messages', (req, res) => {
    getMessages(res);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Sanad Server is running at http://localhost:${PORT}`);
});