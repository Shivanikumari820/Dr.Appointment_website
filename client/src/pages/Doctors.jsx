import { useState } from "react";
import { Tab, Nav, Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import axios from "axios";
import BackEndURL from "../util/BackEndUrl";
import "../css/Doctors.css";

const Doctors = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [mydata, setMydata] = useState([]);

  // Common function to fetch data
  const fetchDoctors = async (endpoint, payload) => {
    try {
      let api = `${BackEndURL}/doctor/${endpoint}`;
      const response = await axios.post(api, payload);
      console.log(response.data);
      setMydata(response.data.doctors || response.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setMydata([]);
    }
  };

  return (
    <Container fluid className="doctors-page py-5">
      <h1 className="text-center mb-4 page-title">Find Your Doctor</h1>
      <p className="text-center text-muted mb-5">
        Search by Name, City, or Specialization to book your appointment easily.
      </p>

      <Tab.Container defaultActiveKey="byName">
        <Nav variant="pills" className="justify-content-center mb-4 search-tabs">
          <Nav.Item>
            <Nav.Link eventKey="byName">By Name</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="byCity">By City</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="bySpeciality">By Specialization</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* By Name */}
          <Tab.Pane eventKey="byName">
            <Form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault();
                fetchDoctors("searchbyname", { name });
              }}
            >
              <Form.Control
                type="text"
                placeholder="Enter Doctor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
          </Tab.Pane>

          {/* By City */}
          <Tab.Pane eventKey="byCity">
            <Form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault();
                fetchDoctors("searchbycity", { city });
              }}
            >
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
          </Tab.Pane>

          {/* By Specialization */}
          <Tab.Pane eventKey="bySpeciality">
            <Form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault();
                fetchDoctors("searchbyspeciality", { speciality });
              }}
            >
              <Form.Select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="">Select Specialization</option>
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
              <Button type="submit">Search</Button>
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* Doctor Results */}
      <Row className="doctor-results mt-5 g-4">
        {mydata.length > 0 ? (
          mydata.map((doctor) => (
            <Col key={doctor._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="doctor-card h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={doctor.image}
                  alt={doctor.doctorname}
                  className="doctor-img"
                />
                <Card.Body>
                  <Card.Title>{doctor.doctorname}</Card.Title>
                  <Card.Text>
                    <strong>Specialization:</strong> {doctor.speciality} <br />
                    <strong>City:</strong> {doctor.city}
                  </Card.Text>
                  <Button variant="primary" className="w-100">
                    Get Appointment
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-danger">No records found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Doctors;
