const express = require("express");
const {
  createMedicalRecord,
  getMedicalRecordById,
  deleteMedicalRecord,
  getAllMedicalRecords,
  updateMedicalRecord,
} = require("../controllers/medical-record");
const { protect } = require("../middlwares/auth");
const router = express.Router();
router.post("/:patientId/:doctorId", protect, createMedicalRecord);
router.get("/", protect, getAllMedicalRecords);
router.get("/:id", protect, getMedicalRecordById);
router.put("/:id", protect, updateMedicalRecord);
router.delete("/:id", protect, deleteMedicalRecord);
module.exports = router;
