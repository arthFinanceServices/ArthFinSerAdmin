const express = require("express");
const router = express.Router();

const { getDealerByEmail } = require("../controllers/dealer.public.controllers");
const {logout} = require("../controllers/logout.controllers");

// ✅ PUBLIC ROUTE (NO AUTH)
router.get("/dealer-by-email", getDealerByEmail);
router.post("/logout", logout);

module.exports = router;
