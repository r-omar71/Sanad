const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use("/", express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Volunteer Page 

function cleanInput(value) {
    if (!value) return "";
    return value.toString().trim().replace(/[<>]/g, "");
}

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
            return res.send("Database connection error");
        }

        let sql = `INSERT INTO volunteers 
        (first_name, last_name, gender, dob, email, phone, interests, skills, availability, languages) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [fName, lName, gender, dob, email, phone, interests, skills, availability, languages], (err, result) => {
            db.end();

            if (err) {
                console.error(err);
                return res.send("Could not save your information");
            }

            console.log("Volunteer saved!");
            res.send("success");
        });
    });
}

app.post('/submit-volunteer', (req, res) => {
    const fName = cleanInput(req.body.firstName);
    const lName = cleanInput(req.body.lastName);
    const gender = cleanInput(req.body.gender);
    const dob = cleanInput(req.body.dob);
    const email = cleanInput(req.body.email);
    const phone = cleanInput(req.body.phone);
    const skills = cleanInput(req.body.skills);

    const interests = req.body.interest ? cleanInput(req.body.interest.toString()) : "";
    const availability = req.body.availability ? cleanInput(req.body.availability.toString()) : "";
    const languages = req.body.language ? cleanInput(req.body.language.toString()) : "";

    let errors = [];

    if (!fName) errors.push("First Name is required");
    if (!lName) errors.push("Last Name is required");
    if (!gender) errors.push("Gender is required");
    if (!dob) errors.push("Date of Birth is required");

    if (!email) {
        errors.push("Email is required");
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) errors.push("Invalid email format");
    }

    if (!phone) {
        errors.push("Phone Number is required");
    } else {
        const phonePattern = /^05[0-9]{8}$/;
        if (!phonePattern.test(phone)) {
            errors.push("Phone must start with 05 and be 10 digits");
        }
    }

    if (!interests) errors.push("Please select at least one Area of Interest");
    if (!skills) errors.push("Skills is required");
    if (!availability) errors.push("Please select at least one Availability option");
    if (!languages) errors.push("Please select at least one Language");

    if (errors.length > 0) {
        return res.send(errors.join(" | "));
    }

    addUser(fName, lName, gender, dob, email, phone, interests, skills, availability, languages, res);
});

//Get section
function getVolunteers(res) {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "sanad_db"
    });

    db.connect((err) => {
        if (err) {
            console.error(err);
            return res.send("Database connection error");
        }

        let sql = "SELECT * FROM volunteers";

        db.query(sql, (err, result) => {
            db.end();

            if (err) {
                console.error(err);
                return res.send("Could not get volunteers data");
            }

            res.json(result);
            
        });
    });
}

app.get('/view-volunteers', (req, res) => {
    getVolunteers(res);
});




// Contact Us Page 


function addMessage(fName, lName, gender, dob, language, email, phone, message, res) {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "sanad_db"
    });

    db.connect((err) => {
        if (err) {
            console.error(err);
            return res.send("Database connection error");
        }

        let sql = `INSERT INTO contact_messages 
        (first_name, last_name, gender, dob, language, email, phone, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [fName, lName, gender, dob, language, email, phone, message], (err, result) => {
            db.end();

            if (err) {
                console.error(err);
                return res.send("Could not save your message");
            }

            console.log("Message saved!");
            res.send("success");
        });
    });
}

app.post('/submit-contact', (req, res) => {
    const fName = cleanInput(req.body.firstName);
    const lName = cleanInput(req.body.lastName);
    const gender = cleanInput(req.body.gender);
    const dob = cleanInput(req.body.dob);
    const language = cleanInput(req.body.language);
    const email = cleanInput(req.body.email);
    const phone = cleanInput(req.body.phone);
    const message = cleanInput(req.body.message);

    let errors = [];

    if (!fName) errors.push("First Name is required");
    if (!lName) errors.push("Last Name is required");
    if (!gender) errors.push("Gender is required");
    if (!dob) errors.push("Date of Birth is required");
    if (!language) errors.push("Language is required");

    if (!email) {
        errors.push("Email is required");
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) errors.push("Invalid email format");
    }

    if (!phone) {
        errors.push("Phone Number is required");
    } else {
        const phonePattern = /^05[0-9]{8}$/;
        if (!phonePattern.test(phone)) {
            errors.push("Phone must start with 05 and contain only numbers, 10 digits");
        }
    }

    if (!message) errors.push("Message is required");

    if (errors.length > 0) {
        return res.send(errors.join(" | "));
    }

    addMessage(fName, lName, gender, dob, language, email, phone, message, res);
});

//Get section

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