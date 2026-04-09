const express = require("express");
const app = express();
const cors = require("cors");
const employeeDetailsRoutes = require("../src/AppRouter/employeeDetails.routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

//API
app.use("/api", employeeDetailsRoutes);

module.exports = app;
