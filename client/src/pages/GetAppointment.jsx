import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BackEndURL from "../util/BackEndUrl";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../css/GetAppointment.css"; // import the CSS

const GetAppointment = () => {
  const { id } = useParams();
  const [mydata, setMydata] = useState({});
  const [input, setInput] = useState({});

  const loadData = async () => {
    try {
      const api = `${BackEndURL}/doctor/getdocinfo/?id=${id}`;
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = `${BackEndURL}/doctor/patientsave`;
      await axios.post(api, { id: id, ...input });
      alert("Patient detail saved successfully!");
      setInput({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="get-appointment-page">
      <h1>Book Your Appointment</h1>

      <Card className="doctor-card">
        <Card.Img variant="top" src={mydata.image || "https://via.placeholder.com/270"} height="270" />
        <Card.Body>
          <Card.Title>{mydata.doctorname}</Card.Title>
          <Card.Text>
            <span style={{ color: "red" }}>Specialization: {mydata.speciality}</span>
            <span style={{ color: "navy" }}>City: {mydata.city}</span>
            <span style={{ color: "black", fontSize: "12px" }}>
              Email: {mydata.email} <br />
              Mobile: {mydata.contact}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>

      <h2>Submit Patient Detail for Appointment</h2>
      <Form className="appointment-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Patient Name</Form.Label>
          <Form.Control type="text" name="patientname" value={input.patientname || ""} onChange={handleInput} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Diseases</Form.Label>
          <Form.Control type="text" name="deseases" value={input.deseases || ""} onChange={handleInput} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={input.address || ""} onChange={handleInput} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact No</Form.Label>
          <Form.Control type="text" name="contact" value={input.contact || ""} onChange={handleInput} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={input.email || ""} onChange={handleInput} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default GetAppointment;