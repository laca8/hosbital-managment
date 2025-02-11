// controllers/doctorController.js
const Doctor = require("../models/Doctor");
const AppError = require("../utils/AppError");
//doctors permission => admin
const createDoctor = async (req, res, next) => {
  try {
    const every = {
      ...req.body,
      userId: req.user._id,
    };
    const doctor = await new Doctor(every);
    await doctor.save();
    return res.status(201).json(doctor);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});
    return res.status(200).json(doctors);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return next(new AppError("doctor not found...", 500));
    }
    return res.status(200).json(doctor);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) {
      return next(new AppError(error.message, 500));
    }
    return res.status(200).json(doctor);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return next(new AppError(error.message, 500));
    }
    res.json({ message: "doctor deleted..." });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
module.exports = {
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  createDoctor,
};
