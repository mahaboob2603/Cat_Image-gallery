const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  createCat,
  getAllCats,
  getCatById,
  updateCat,
  deleteCat,
} = require("../controllers/catController");

router.get("/", getAllCats);
router.get("/:id", getCatById);
router.post("/", protect, upload.single("image"), createCat);
router.put("/:id", protect, upload.single("image"), updateCat);
router.delete("/:id", protect, deleteCat);

module.exports = router;