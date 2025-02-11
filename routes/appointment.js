const express = require("express");
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  cancelAppointment,
  updateAppointment,
} = require("../controllers/appointment");
const { protect } = require("../middlwares/auth");
const router = express.Router();
router.post("/:patientId/:doctorId", protect, createAppointment);
router.get("/", protect, getAllAppointments);
router.get("/:id", protect, getAppointmentById);
router.put("/:id", protect, cancelAppointment);
router.put("/:id", protect, updateAppointment);
module.exports = router;
