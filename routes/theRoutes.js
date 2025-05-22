

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://127.0.0.1:27017/user-pass").then(() => {
    console.log("Connected to MongoDB :)")
}).catch((error) => {
    console.log("Error connecting to database: " + error); 
});

// Användare-modell.
const User = require("../models/User");

router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        let array = [];

        // Användarnamn måsta vara minst 7 tecken långt.
        if(!username || username.length < 7) {
            array.push("Vänligen skapa ett användarnamn!")
            return res.status(400).json({ error: "Vänligen fyll i användarnamn!" });
        }

        // Epost måste inkludera @ och en punkt.
        if(!email || !email.includes("@" && ".")) {
            array.push("Vänligen ange epost!")
            return res.status(400).json({ error: "Vänligen fyll i epost!" });
        }

        if(!password) {
            array.push("Vänligen skapa ett lösenord!")
            return res.status(400).json({ error: "Vänligen fyll i lösenord!" });
        }

        // Om det har fyllt i korrekt = skapa användare.
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: "Användare skapad!"});
    } catch(error) {
        res.status(500).json({ error: "Server error!"});
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ error: "Felaktigt användarnamn/lösenord..." })
        }

        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Felaktigt användarnamn/lösenord..." });
        }

        const passMatch = await user.comparePass(password);
        if(!passMatch) {
            return res.status(401).json({ error: "Felaktigt användarnamn/lösenord..." })
        } else {
            // Skapa JWT.
            const userInfo = { username: username };
            const token = jwt.sign(userInfo, process.env.JWT_KEY, { expiresIn: '1h' });
            const response = {
                message: "Användare inloggad..",
                token: token
            }
            res.status(200).json({ response });
        }

    } catch(error) {
        res.status(500).json({ error: "Server error!" });
        console.error(error);
    }
});


module.exports = router;