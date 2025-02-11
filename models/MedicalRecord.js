// models/medicalRecord.js التشخيص
const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
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
  //تشخبص
  diagnosis: {
    type: String,
    required: true,
  },
  //علاجات
  prescription: [
    {
      medication: String,
      dosage: String,
      frequency: String,
    },
  ],
  //خطة علاج
  treatmentPlan: {
    type: String,
  },
  //اضافة فحص
  testResults: [
    {
      testName: String,
      result: String,
      date: Date,
    },
  ],
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("medical-record", medicalRecordSchema);
