// controllers/appointmentController.js
const Appointment = require("../models/Appoinment");
const AppError = require("../utils/AppError");

const createAppointment = async (req, res, next) => {
  try {
    const every = {
      ...req.body,
      patient: req.params.patientId,
      doctor: req.params.doctorId,
    };
    const appointment = new Appointment(every);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "firstName lastName")
      .populate("doctor", "firstName lastName specialization");
    return res.status(200).json(appointments);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient")
      .populate("doctor");
    if (!appointment) {
      return next(new AppError("appointment not found...", 500));
    }

    res.json(appointment);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const confirmAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Confirmed" },
      { new: true }
    );
    if (!appointment) {
      return next(new AppError("appointment not found...", 500));
    }
    res.json({ message: "Appointment canelled...." });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const updateAppointment = async (req, res, next) => {
  try {
    const appointmentExist = await Appointment.findById(req.params.id);
    if (appointmentExist.status == "Confirmed") {
      return next(new AppError("appointment is already Confirmed...", 500));
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("patient")
      .populate("doctor");

    if (!appointment) {
      return next(new AppError("appointment not found...", 500));
    }

    res.json(appointment);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );
    if (!appointment) {
      return next(new AppError("appointment not found...", 500));
    }
    res.json({ message: "Appointment canelled...." });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
};
