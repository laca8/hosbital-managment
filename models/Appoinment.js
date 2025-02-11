// models/appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Confirmed", "Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  reason: {
    type: String,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("appointment", appointmentSchema);
