// controllers/medicalRecordController.js
const MedicalRecord = require("../models/MedicalRecord");

const createMedicalRecord = async (req, res, next) => {
  try {
    const every = {
      ...req.body,
      patient: req.params.patientId,
      doctor: req.params.doctorId,
    };
    const medicalRecord = new MedicalRecord(every);
    await medicalRecord.save();
    res.status(201).json(medicalRecord);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getAllMedicalRecords = async (req, res, next) => {
  try {
    const medicalRecords = await MedicalRecord.find()
      .populate("patient", "firstName lastName")
      .populate("doctor", "firstName lastName specialization");
    res.json(medicalRecords);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getMedicalRecordById = async (req, res, next) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id)
      .populate("patient")
      .populate("doctor");
    if (!medicalRecord) {
      return next(new AppError("medical not found...", 404));
    }
    res.json(medicalRecord);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const updateMedicalRecord = async (req, res, next) => {
  try {
    const medicalRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!medicalRecord) {
      return next(new AppError("medical not found...", 404));
    }
    res.json(medicalRecord);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteMedicalRecord = async (req, res, next) => {
  try {
    const medicalRecord = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!medicalRecord) {
      return next(new AppError("medical not found...", 404));
    }
    res.json({ message: "delete medical record success.." });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
module.exports = {
  deleteMedicalRecord,
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
};
