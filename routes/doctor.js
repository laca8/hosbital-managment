const express = require("express");
const {
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  createDoctor,
} = require("../controllers/doctor");
const { protect, allowTo } = require("../middlwares/auth");
const router = express.Router();
router.post("/", protect, createDoctor);
router.get("/", protect, getAllDoctors);
router.get("/:id", protect, getDoctorById);
router.delete("/:id", protect, deleteDoctor);
router.put("/:id", protect, updateDoctor);
module.exports = router;
