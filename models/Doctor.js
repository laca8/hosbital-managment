// models/doctor.js
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  branches: {
    type: [
      {
        branch: {
          type: String,
          required: [true, "Branch Required"],
        },
        start: {
          type: String,
          required: [true, "Starting Time Required"],
        },
        end: {
          type: String,
          required: [true, "Ending Time Required"],
        },
        days: {
          type: Array,
          required: [true, "days Required"],
        },
      },
    ],
    required: [true, "Branches Required"],
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("doctor", doctorSchema);
