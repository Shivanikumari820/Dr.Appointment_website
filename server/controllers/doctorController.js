const DoctorModel = require("../models/doctorModel");



const doctorSave=async(req, res)=>{
 try {
     const   {name, speciality, city, address, contact, email, password}= req.body;
    
     const Doctor = await DoctorModel.create({
         doctorname: name,
        speciality: speciality,
         city: city,
         address: address,
         image:  req.file.path,
         contact:contact,
         email: email,
         password: password
     })    


 res.json({
 success: true,
 fileUrl: req.file.path, // Cloudinary file URL
 });
 } catch (err) {
 res.status(500).json({ success: false, message: err.message });
 }
}

module.exports={
    doctorSave
}