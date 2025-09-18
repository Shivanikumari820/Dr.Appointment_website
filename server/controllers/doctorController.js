const DoctorModel = require("../models/doctorModel");
const PatientModel = require("../models/patientModel");
const jwt = require("jsonwebtoken");

// JWT token generate
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Doctor Registration
const doctorSave = async (req, res) => {
  try {
    const { name, speciality, city, address, contact, email, password } = req.body;

    const doctorExists = await DoctorModel.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ success: false, message: "Doctor already registered!" });
    }

    const Doctor = await DoctorModel.create({
      doctorname: name,
      speciality,
      city,
      address,
      image: req.file?.path || "",
      contact,
      email,
      password
    });

    res.status(201).json({
      success: true,
      doctor: Doctor,
      token: generateToken(Doctor._id)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Doctor Login
const doctorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const Doctor = await DoctorModel.findOne({ email });
    if (!Doctor) return res.status(401).json({ msg: "Email not found!" });

    if (Doctor.password !== password) return res.status(401).json({ msg: "Password does not match!" });

    res.status(200).json({
      success: true,
      doctor: Doctor,
      token: generateToken(Doctor._id)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Fetch all doctors
const doctorInfo = async (req, res) => {
  try {
    const Doctors = await DoctorModel.find();
    res.status(200).json(Doctors);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search by Name
const doctorSearchByName = async (req, res) => {
  const { name } = req.body;
  try {
    const Doctor = await DoctorModel.find({ doctorname: name });
    res.status(200).json(Doctor);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search by City
const doctorSearchByCity = async (req, res) => {
  const { city } = req.body;
  try {
    const Doctor = await DoctorModel.find({ city });
    res.status(200).json(Doctor);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search by Speciality
const doctorSearchBySpeciality = async (req, res) => {
  const { speciality } = req.body;
  try {
    const Doctor = await DoctorModel.find({ speciality });
    res.status(200).json(Doctor);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single doctor info
const getdoctorInfo = async (req, res) => {
  const { id } = req.query;
  try {
    const Doctor = await DoctorModel.findById(id);
    res.status(200).json(Doctor);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Save patient
const patientSave = async (req, res) => {
  const { id, patientname, deseases, address, contact, email } = req.body;
  try {
    await PatientModel.create({
      patientname,
      deseases,
      contactno: contact,
      address,
      email,
      docid: id
    });
    res.status(201).json({ msg: "Patient Detail Saved!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get patients of a doctor
const getPateintDetail = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ success: false, message: "Doctor ID missing!" });
  try {
    const patients = await PatientModel.find({ docid: id });
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  doctorSave,
  doctorLogin,
  doctorInfo,
  doctorSearchByName,
  doctorSearchByCity,
  doctorSearchBySpeciality,
  getdoctorInfo,
  patientSave,
 getPateintDetail
};
