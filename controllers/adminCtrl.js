const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({})
    res.status(200).send({
      success: true,
      message: 'user data fetch successfully',
      data: users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error while fetching users',
    })
  }
}

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({})
    res.status(200).send({
      success: true,
      message: 'doctors data fetch successfully',
      data: doctors,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error while fetching doctors data',
    })
  }
}
//doctor account ststus
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status })
    const user = await userModel.findOne({ _id: doctor.userId })
    const notification = user.notification
    notification.push({
      type: 'doctor-account-request-updated',
      message: `Your Doctor Account Request Has ${status}`,
      onClickPath: '/notification',
    })
    user.isDoctor = status === 'approved' ? true : false
    await user.save()
    res.status(201).send({
      succes: true,
      message: 'Account Status Updated',
      data: doctor,
    })
  } catch (error) {
    console.log(error)
    res.status().send({
      message: 'Error While Changing Account Status',
      succes: false,
      error,
    })
  }
}
module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
}
