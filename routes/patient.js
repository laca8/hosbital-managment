const express = require("express");
const {
  addPatient,
  getPatients,
  getPatientById,
  deletePatient,
  updatePatient,
} = require("../controllers/patient");
const { protect } = require("../middlwares/auth");
const router = express.Router();
router.post("/", protect, addPatient);
router.get("/", protect, getPatients);
router.get("/:id", protect, getPatientById);
router.delete("/:id", protect, deletePatient);
router.put("/:id", protect, updatePatient);
module.exports = router;
