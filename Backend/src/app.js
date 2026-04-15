// const express = require("express");
// const app = express();
// const cors = require("cors");
// const employeeDetailsRoutes = require("../src/AppRouter/employeeDetails.routes");
// const cookieParser = require("cookie-parser");

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
// }));
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         process.env.FRONTEND_URL
//       ];

//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//   })
// );
// //API
// app.use("/api", employeeDetailsRoutes);

// module.exports = app;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const employeeDetailsRoutes = require("../src/AppRouter/employeeDetails.routes");
const dealer = require("../src/AppRouter/dealer.routes");
const dealerPublicRoutes = require("../src/AppRouter/dealer.public.routes");


app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  process.env.FRONTEND_URL,        // e.g. https://arth-fin-ser-admin.vercel.app
  process.env.ADMIN_FRONTEND_URL,  // e.g. https://admin.arthfinanceservices.com
  process.env.LOCALHOST_URL        // e.g. http://localhost:5173
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.set("trust proxy", 1);
// ✅ API routes
app.use("/api", employeeDetailsRoutes);
app.use("/api", dealer);
app.use("/api", dealerPublicRoutes);

module.exports = app;
