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
const employeeLinksRoutes = require("../src/AppRouter/employeeLinks.routes");
const globalLinksRoutes = require("../src/AppRouter/globalLinks.routes");
const employeeProfileRoutes = require("../src/AppRouter/employeeProfile.routes");

app.use(express.json());
app.use(cookieParser());

// ✅ SINGLE, CORRECT CORS CONFIG
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL,        // https://arth-fin-ser-admin.vercel.app
        process.env.ADMIN_FRONTEND_URL,  // https://admin.arthfinanceservices.com
      ];

      // allow requests with no origin (Postman, curl, server-to-server)
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

// ✅ API routes
app.use("/api", employeeDetailsRoutes);
app.use("/api", dealer);
app.use("/api", dealerPublicRoutes);
app.use("/api", employeeLinksRoutes);
app.use("/api", globalLinksRoutes);
app.use("/api", employeeProfileRoutes);

module.exports = app;
