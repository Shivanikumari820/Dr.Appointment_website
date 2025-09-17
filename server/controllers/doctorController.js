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
      image: req.file.path || "",
      contact,
      email,
      password
    });

    res.status(201).json({
      success: true,
      doctors: [Doctor], // always return array for frontend .map()
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
    if (!Doctor) return res.status(401).json({ success: false, message: "Invalid Email!" });

    const isMatch = await Doctor.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid Password!" });

    res.status(200).json({
      success: true,
      doctor: {
        id: Doctor._id,
        doctorname: Doctor.doctorname,
        email: Doctor.email
      },
      token: generateToken(Doctor._id)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all doctors
const doctorInfo = async (req, res) => {
  try {
    const Doctors = await DoctorModel.find().select("-password");
    res.status(200).json({ success: true, doctors: Doctors }); // always send array
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search by Name
const doctorSearchByName = async (req, res) => {
  const { name } = req.body;
  try {
    const Doctor = await DoctorModel.find({ doctorname: { $regex: name, $options: "i" } }).select("-password");
    res.status(200).json({ success: true, doctors: Doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search by City
const doctorSearchByCity = async (req, res) => {
  const { city } = req.body;
  try {
    const Doctor = await DoctorModel.find({ city: { $regex: city, $options: "i" } }).select("-password");
    res.status(200).json({ success: true, doctors: Doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const doctorSearchBySpeciality=async(req, res)=>{
  const { speciality } = req.body ;
  const Doctor = await DoctorModel.find({speciality:speciality});
  res.status(200).send(Doctor);
}

const getdoctorInfo=async(req, res)=>{
  const {id} = req.query;
  const Doctor = await DoctorModel.findById(id);
  res.send(Doctor);
}



const patientSave=async(req, res)=>{
  const {id, patientname, deseases, address, contact, email } = req.body;
    const Pateint = await PatientModel.create({
          patientname: patientname, 
        deseases: deseases,
         contactno:contact,
         address: address,
         email: email,
         docid: id
    })

res.status(201).send("Patient Detail Save!!");
}

const getPateintDetail=async(req, res)=>{
      const {id} = req.query;
      const patient = await PatientModel.find({docid:id})
      res.send(patient);

}


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

