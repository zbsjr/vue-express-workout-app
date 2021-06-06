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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
