

const express = require("express");
const router = express.Router();

router.post("/login", async (res, req) => {
    console.log("Login called...");
});

router.post("/register", async (res, req) => {
    console.log("Register called...");
});

module.exports = router;