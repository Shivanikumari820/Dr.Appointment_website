import logo from "../images/logo.png";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import BackEndURL from "../util/BackEndUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Header = () => {
  const [input, setInput] = useState({});
  const [image, setImage] = useState("");

  // States for modals
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [signupRole, setSignupRole] = useState(""); // Patient or Doctor
  const [loginRole, setLoginRole] = useState("");

  // Modal handlers
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleImage = (e) => setImage(e.target.files[0]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
    console.log(input);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let api = "";

      // Doctor Signup
      if (signupRole === "Doctor") {
        api = `${BackEndURL}/doctor/doctorsave`;

        if (!image) {
          return alert("Please select a Doctor Image");
        }

        const formData = new FormData();
        formData.append("file", image);

        for (let x in input) {
          formData.append(x, input[x]);
        }

        const res = await axios.post(api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Doctor Signup Response:", res.data);
        setShowSignup(false);
        toast.success("Doctor Registered Successfully!");
      }

      // Patient Signup
      else if (signupRole === "Patient") {
        api = `${BackEndURL}/patient/patientsave`;

        const res = await axios.post(api, input);

        console.log("Patient Signup Response:", res.data);
        setShowSignup(false);
        toast.success("Patient Registered Successfully!");
      }

      else {
        alert("Please select a role (Doctor or Patient)");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error("Something went wrong! Please try again.");
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
          <Button variant="primary" onClick={handleShowLogin}>Login</Button>
          <Button variant="primary" onClick={handleShowSignup}>Signup</Button>
        </div>
      </div>

      {/* ===== Login Modal ===== */}
      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="role-selector">
            <p><strong>Login as:</strong></p>
            <label>
              <input type="radio" name="roleLogin" value="Patient" onChange={(e) => setLoginRole(e.target.value)} /> Patient
            </label>
            <label>
              <input type="radio" name="roleLogin" value="Doctor" onChange={(e) => setLoginRole(e.target.value)} /> Doctor
            </label>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleInput} />
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ===== Signup Modal ===== */}
      <Modal show={showSignup} onHide={handleCloseSignup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="role-selector">
            <p><strong>Signup as:</strong></p>
            <label>
              <input type="radio" name="roleSignup" value="Patient" onChange={(e) => setSignupRole(e.target.value)} /> Patient
            </label>
            <label>
              <input type="radio" name="roleSignup" value="Doctor" onChange={(e) => setSignupRole(e.target.value)} /> Doctor
            </label>
          </div>

          <Form onSubmit={handleSubmit}>
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

            {/* Doctor additional details */}
            {signupRole === "Doctor" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Select name="speciality" onChange={handleInput}>
                    <option>Open this select menu</option>
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
                  <Form.Label>Upload Doctor Image</Form.Label>
                  <Form.Control type="file" name="file" onChange={handleImage} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control type="text" name="contact" onChange={handleInput} />
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit">Signup</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}

export default Header;
