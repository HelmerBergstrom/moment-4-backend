

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const theRoutes = require("./routes/theRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use("/api", theRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/user-pass").then(() => {
    console.log("Connected to MongoDB :)")
}).catch((error) => {
    console.log("Error connecting to database: " + error); 
});

// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     dateCreated: {
//         type: Date,
//     }
// }); 

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port)
})