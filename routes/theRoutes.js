

const express = require("express");
const router = express.Router();

mongoose.connect("mongodb://127.0.0.1:27017/user-pass").then(() => {
    console.log("Connected to MongoDB :)")
}).catch((error) => {
    console.log("Error connecting to database: " + error); 
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true 
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}); 

router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        let array = [];

        // Användarnamn måsta vara minst 7 tecken långt.
        if(!username || username.length < 7) {
            array.push("Vänligen skapa ett användarnamn!")
            return res.status(400).json({ error: "Vänligen fyll i användarnamn!" });
        }

        if(!password) {
            array.push("Vänligen skapa ett lösenord!")
            return res.status(400).json({ error: "Vänligen fyll i lösenord!" });
        }
        // Epost måste inkludera @ och en punkt.
        if(!email || !email.includes("@" && ".")) {
            array.push("Vänligen ange epost!")
            return res.status(400).json({ error: "Vänligen fyll i epost!" });
        }

        // Om det har fyllt i korrekt = skapa användare.
        res.status(201).json({ message: "Användare skapad!"});
    } catch(error) {
        res.status(500).json({ error: "Server error!"});
    }
});


router.post("/login", async (req, res) => {
    try {

        res.status(201).json({ message: "Logged in! "});
    } catch(error) {
        res.status(500).json({ error: "Server error!" });
    }
});


module.exports = router;