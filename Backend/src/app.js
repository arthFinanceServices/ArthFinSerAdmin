const express = require("express");
const app = express();
const cors = require("cors");
const employeeDetailsRoutes = require("../src/AppRouter/employeeDetails.routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));

//API
app.use("/api", employeeDetailsRoutes);

module.exports = app;
