import Carousel from 'react-bootstrap/Carousel';
import slide1 from "../images/slides1.jpg";
import slide2 from "../images/slides2.jpg";
import slide3 from "../images/slides3.jpg";
import slide4 from "../images/slides4.jpg";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "../css/Home.css";
import BackEndURL from '../util/BackEndUrl';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [mydata, setMydata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${BackEndURL}/doctor/doctorinfo`);
        setMydata(res.data.doctors); // make sure backend returns { doctors: [...] }
        console.log(res.data.doctors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      {/* ===== Carousel Section ===== */}
      <Carousel>
        <Carousel.Item>
          <img src={slide1} width="100%" height="300" />
          <Carousel.Caption>
            <h3>Your Health, Our Priority</h3>
            <p>Book appointments with top doctors anytime, anywhere.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={slide2} width="100%" height="300" />
          <Carousel.Caption>
            <h3>Find the Right Specialist</h3>
            <p>Search from hundreds of experienced doctors across multiple specialties and locations.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={slide3} width="100%" height="300" />
          <Carousel.Caption>
            <h3>Easy & Quick Booking</h3>
            <p>Skip the waiting lines – schedule your appointment in just a few clicks.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={slide4} width="100%" height="300" />
          <Carousel.Caption>
            <h3>Trusted By Thousands</h3>
            <p>Join our growing community of patients who choose smart healthcare every day.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* ===== Top Doctors Section ===== */}
      <h1 className="section-heading">Top Doctors</h1>

      <div id="docList" style={{ display: "flex", flexWrap: "wrap" }}>
        {Array.isArray(mydata) && mydata.length > 0 ? (
          mydata.map(doc => (
            <Card key={doc._id} style={{ width: '18rem', margin: "10px" }}>
              <Card.Img variant="top" src={doc.image || "https://via.placeholder.com/270"} height="270" />
              <Card.Body>
                <Card.Title>{doc.doctorname}</Card.Title>
                <Card.Text>
                  <span style={{ color: "red", fontWeight: "bold" }}>Specialization: {doc.speciality}</span><br />
                  <span style={{ color: "navy", fontWeight: "bold" }}>City: {doc.city}</span>
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/getappointment/${doc._id}`)}
                >
                  Get Appointment
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p style={{ margin: "20px" }}>Loading doctors...</p>
        )}
      </div>
    </>
  );
}

export default Home;
