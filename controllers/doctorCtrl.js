const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')
const appointmentModel = require('../models/appointmentModel')

//get doctor controller
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId })
    res.status(200).send({
      success: true,
      message: 'doctor data fetch success',
      data: doctor,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Fetching Doctor Details',
    })
  }
}

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
    )
    res.status(201).send({
      success: true,
      message: 'Doctor Profile Updated',
      data: doctor,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Doctor Profile Update issue',
      error,
    })
  }
}

//get single doctor
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId })
    res.status(200).send({
      success: true,
      message: 'Single Doc Info Fetched',
      data: doctor,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Single Doctor',
      error,
    })
  }
}

//doctor Appointment Controller
const doctorAppointmentController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId })
    const appointments = await appointmentModel.find({
      doctorId: doctor.id,
    })
    res.status(200).send({
      success: true,
      message: 'Doctor Appointments fetch Successfully',
      data: appointments,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Doc Appointments',
    })
  }
}
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status },
    )
    const user = await userModel.findOne({ _id: appointmentsId.userId })
    user.notification.push({
      type: 'status-updated',
      message: `Your Appointment has been updated ${status}`,
      onCLickPath: '/doctor-appointments',
    })
    await user.save()
    res.status(200).send({
      success: true,
      message: 'Appointment Status Updated',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Update Statsus',
    })
  }
}
module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentController,
  updateStatusController,
}
