const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middleware/auth.middleware");
const { getDealerByEmail } = require("../controllers/dealer.public.controllers");

const {
  getDealers,
  addDealer,
  updateDealer,
  deleteDealer,
} = require("../controllers/dealer.controllers");

router.get("/dealers", authMiddleWare, getDealers);
router.post("/addDealer", authMiddleWare, addDealer);
router.patch("/updateDealer/:id", authMiddleWare, updateDealer);

router.get("/dealer-by-email", getDealerByEmail);
router.delete("/deleteDealer/:id", authMiddleWare, deleteDealer);

module.exports = router;
