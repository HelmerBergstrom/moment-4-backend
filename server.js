

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const theRoutes = require("./routes/theRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use("/api", theRoutes);

app.get("/api/secret", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route..." });
});

function authenticateToken(req, res, next) {
    const headerAuth = req.headers['authorization'];
    const token = headerAuth && headerAuth.split(' ')[1];

    if(token === null) {
        res.status(401).json({ message: "Token missing!" })
    }

    jwt.verify(token, process.env.JWT_KEY, (err, username) => {
        if(err) { 
            return res.status(403).json({ message: "Felaktig Token!" })
        }

        req.username = username;
        next();
    })
}

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port)
})