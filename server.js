

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const theRoutes = require("./routes/theRoutes");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api", theRoutes);

app.get("/api/secret", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route..." });
});

app.get("/api/users", authenticateToken, async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exkludera lösenord
        res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: "Något gick fel vid hämtning av användare" });
    }
});

function authenticateToken(req, res, next) {
    const headerAuth = req.headers['authorization'];
    const token = headerAuth && headerAuth.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: "Token saknas! Du är inte behörig.." })
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err) { 
            return res.status(403).json({ message: "Åtkomst nekad! Token ogiltlig eller utgången." })
        }

        req.username = decoded.username;
        next();
    })
}

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port)
})