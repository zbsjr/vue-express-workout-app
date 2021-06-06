const express = require("express");
const bodyParser = require("body-parser"); // Parse the JSON that comes in
const cors = require("cors");

const app = express(); // Initialize express

// Middleware - Act as a bridge between the OS/database and the application
app.use(bodyParser.json());
app.use(cors());
// End Middleware

const exercises = require("./routes/api/exercises"); // Bring in the API
app.use("/api/exercises", exercises); // Set if /api/exercises is the URL, route it to exercises.js

// Handle production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/pulblic/"));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
