const Patient = require("../models/Patient");
const AppError = require("../utils/AppError");

const addPatient = async (req, res, next) => {
  try {
    const every = {
      ...req.body,
      userId: req.user._id,
    };
    const patient = new Patient(every);
    await patient.save();
    return res.status(201).json(patient);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find({});
    return res.json(patients);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return next(new AppError("patient not found ...", 500));
    }
    res.json(patient);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return next(new AppError("patient not found ...", 500));
    }
    res.json(patient);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return next(new AppError("patient not found ...", 500));
    }
    res.json({ message: "patient deleted..." });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
module.exports = {
  addPatient,
  getPatientById,
  getPatients,
  deletePatient,
  updatePatient,
};
