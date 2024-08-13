/** @format */

// import express from "express";
// import path from "path";
// const app = express();
// import { fileURLToPath } from "url";

const express = require("express");
const path = require("path");
const app = express();
const { fileURLToPath } = require("url");


// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "public")));

// when enter /[view-name] in the url, it will render the view
app.get("/:view", (req, res) => {
    res.render(`${req.params.view}`);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
