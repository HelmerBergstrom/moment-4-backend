

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const theRoutes = require("./routes/theRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use("/api", theRoutes);


app.listen(port, () => {
    console.log("Server running on http://localhost:" + port)
})