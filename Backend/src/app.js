const express = require("express");
const app = express();
const cors = require("cors");
const employeeDetailsRoutes = require("../src/AppRouter/employeeDetails.routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
// }));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

//API
app.use("/api", employeeDetailsRoutes);

module.exports = app;
