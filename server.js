

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const theRoutes = require("./routes/theRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;
app.use(bodyParser.json());

app.use("/api", theRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/api").then(() => {
    console.log("Connected to MongoDB :)")
}).catch((error) => {
    console.log("Error connecting to database: " + error); 
}) 

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port)
})