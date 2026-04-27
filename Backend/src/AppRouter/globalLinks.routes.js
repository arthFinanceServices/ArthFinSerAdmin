const router = require("express").Router();
const { authMiddleWare } = require("../middleware/auth.middleware");
const {
  getGlobalLinks,
  addGlobalLink,
  updateGlobalLink,
  deleteGlobalLink,
} = require("../controllers/globalLinks.controllers");

router.get("/global-links", authMiddleWare, getGlobalLinks);
router.post("/global-links", authMiddleWare, addGlobalLink);
router.patch("/global-links/:id", authMiddleWare, updateGlobalLink);
router.delete("/global-links/:id", authMiddleWare, deleteGlobalLink);

module.exports = router;