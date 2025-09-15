import Carousel from 'react-bootstrap/Carousel';
import slide1 from "../images/slides1.jpg";
import slide2 from "../images/slides2.jpg";
import slide3 from "../images/slides3.jpg";
import slide4 from "../images/slides4.jpg";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import doc1 from "../images/doc1.jpeg";
import doc2 from "../images/doc2.jpeg";
import doc3 from "../images/doc3.jpeg";
import doc4 from "../images/doc4.jpeg";
import doc5 from "../images/doc5.jpeg";
import doc6 from "../images/doc6.jpeg";
import doc7 from "../images/doc7.jpeg";
import doc8 from "../images/doc8.jpeg";
import "../css/Home.css";
const Home=()=>{
    return(
        <>
           <Carousel>
              <Carousel.Item>
                <img src={slide1} width="100%" />
                <Carousel.Caption>
                  <h3>Your Health, Our Priority</h3>
                  <p>Book appointments with top doctors anytime, anywhere. Reliable and trusted healthcare at your fingertips.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img src={slide2} width="100%" />
                <Carousel.Caption>
                  <h3>Find the Right Specialist</h3>
                  <p>Search from hundreds of experienced doctors across multiple specialties and locations.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img src={slide3} width="100%" />
                <Carousel.Caption>
                  <h3>Easy & Quick Booking</h3>
                  <p>Skip the waiting lines – schedule your appointment in just a few clicks.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img src={slide4} width="100%" />
                <Carousel.Caption>
                  <h3>Trusted By Thousands</h3>
                  <p>Join our growing community of patients who choose smart healthcare every day.</p>
                </Carousel.Caption>
              </Carousel.Item>
          </Carousel>

          <h1 className="section-heading">Top Doctors</h1>

          <div id="docList">
            <Card>
              <Card.Img variant="top" src={doc1} />
              <Card.Body>
                <Card.Title>Dr. Aakash Mehra</Card.Title>
                <Card.Text>
                  Cardiologist | 12+ yrs exp<br/>
                  📍 Delhi | ⭐ 4.8
                </Card.Text>
                <Button variant="primary">Book Now</Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src={doc2} />
              <Card.Body>
                <Card.Title>Dr. Riya Sharma</Card.Title>
                <Card.Text>
                  Neurologist | 10+ yrs exp<br/>
                  📍 Mumbai | ⭐ 4.7
                </Card.Text>
                <Button variant="primary">Book Now</Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src={doc3} />
              <Card.Body>
                <Card.Title>Dr. Vikram Patel</Card.Title>
                <Card.Text>
                  Orthopedic | 15+ yrs exp<br/>
                  📍 Bangalore | ⭐ 4.9
                </Card.Text>
                <Button variant="primary">Book Now</Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src={doc4} />
              <Card.Body>
                <Card.Title>Dr. Neha Gupta</Card.Title>
                <Card.Text>
                  Pediatrician | 8+ yrs exp<br/>
                  📍 Pune | ⭐ 4.6
                </Card.Text>
                <Button variant="primary">Book Now</Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src={doc5} />
              <Card.Body>
                <Card.Title>Dr. Rajat Kapoor</Card.Title>
                <Card.Text>
                  Dermatologist | 11+ yrs exp<br/>
                  📍 Kolkata | ⭐ 4.7
                </Card.Text>
                <Button variant="primary">Book Now</Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src={doc6} />
              <Card.Body>
                <Card.Title>Dr. Meera Nair</Card.Title>
                <Card.Text>
                  Gynecologist | 14+ yrs exp<br/>
                  📍 Chennai | ⭐ 4.8
                </Card.Text>
                <Button variant="primary">Book Now</Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src={doc7} />
              <Card.Body>
                <Card.Title>Dr. Arjun Desai</Card.Title>
                <Card.Text>
                  General Surgeon | 9+ yrs exp<br/>
                  📍 Jaipur | ⭐ 4.5
                </Card.Text>
                <Button variant="primary">Book Now</Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src={doc8} />
              <Card.Body>
                <Card.Title>Dr. Ananya Verma</Card.Title>
                <Card.Text>
                  Psychiatrist | 13+ yrs exp<br/>
                  📍 Hyderabad | ⭐ 4.9
                </Card.Text>
                <Button variant="primary">Book Now</Button>
              </Card.Body>
            </Card>
          </div>
        </>
    )
}

export default Home;
