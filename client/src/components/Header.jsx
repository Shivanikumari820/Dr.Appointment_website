import logo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import BackEndURL from "../util/BackEndUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const [input, setInput] = useState({});
  const [image, setImage] = useState("");

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");

  const navigate = useNavigate();

  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleInput = (e) => {
    let { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => setImage(e.target.files[0]);

  // Doctor Registration
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    try {
      const formData = new FormData();
      formData.append("file", image);
      for (let key in input) {
        formData.append(key, input[key]);
      }

      const res = await axios.post(`${BackEndURL}/doctor/doctorsave`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      setShowSignup(false);
      toast.success("Doctor Registered Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! Try again.");
    }
  };

  // Doctor Login
  const handleLogin = async (e) => {
  e.preventDefault();
  let api = `${BackEndURL}/doctor/doctorlogin`;

  try {
    const response = await axios.post(api, { email: email1, password: password1 });
    console.log(response.data);

    // Check kya doctor object exist karta hai
    const doctorData = response.data.doctor || response.data; 
    console.log("Logged in doctor:", doctorData);

    // Correctly set docid in localStorage
    localStorage.setItem("docid", doctorData.data._id);
    localStorage.setItem("docname", doctorData.data.doctorname);

    navigate("/doctordashboard");
  } catch (error) {
    console.log(error);
    toast.error("Login failed!");
  }
};


  return (
    <>
      <div id="header">
        <div id="logo">
          <img src={logo} className="logoimg" />
        </div>
        <h1 className="title">Online Doctor Appointment</h1>
        <div id="rightmenu">
          <Button variant="primary" onClick={handleShowLogin}>
            Login
          </Button>
          <Button variant="primary" onClick={handleShowSignup}>
            Signup
          </Button>
        </div>
      </div>

      {/* Signup Modal */}
      <Modal show={showSignup} onHide={handleCloseSignup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Select name="speciality" onChange={handleInput}>
                <option>Select Specialization</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Radiologist">Radiologist</option>
                <option value="General Physician">General Physician</option>
                <option value="ENT Specialist">ENT Specialist</option>
                <option value="Dentist">Dentist</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Surgeon">Surgeon</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Clinic Address</Form.Label>
              <Form.Control type="text" name="address" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" name="contact" onChange={handleInput} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Doctor Image</Form.Label>
              <Form.Control type="file" name="file" onChange={handleImage} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Header;
