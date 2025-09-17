import React, { useEffect, useState } from "react";
import axios from "axios";
import BackEndURL from "../util/BackEndUrl";
import slide1 from "../images/slides2.jpg";
import slide2 from "../images/slide3.jpg";
import slide3 from "../images/slides3.jpg";


import "../css/About.css";

const About = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BackEndURL}/about/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="page-title">About Appointment Online</h1>
        <p className="hero-text">
          Our mission is to make healthcare accessible to everyone. Find trusted
          doctors in every city, fast and reliable.
        </p>
      </section>

      {/* Slides Section */}
      <section className="slides-section">
  <div className="slide">
    <img src={slide1} alt="slide1"/>
    <div className="slide-text">
      <h2>Trusted Doctors at Your Fingertips</h2>
      <p>Connect with top specialists in your city easily and quickly.</p>
    </div>
  </div>
  <div className="slide">
    <img src={slide2} alt="slide2"/>
    <div className="slide-text">
      <h2>Easy Appointment Booking</h2>
      <p>Book appointments online anytime, anywhere.</p>
    </div>
  </div>
  <div className="slide">
    <img src={slide3} alt="slide3"/>
    <div className="slide-text">
      <h2>Patient-Centered Care</h2>
      <p>Our platform prioritizes your health and convenience.</p>
    </div>
  </div>
</section>


      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Dr. Shivani"/>
            <h3>Dr. Shivani Kumari</h3>
            <p>Founder & Chief Medical Officer</p>
          </div>
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Dr. Rajesh"/>
            <h3>Dr. Rajesh Kumar</h3>
            <p>Senior Advisor</p>
          </div>
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/women/72.jpg" alt="Anjali"/>
            <h3>Anjali Sharma</h3>
            <p>Operations Manager</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <h2 className="section-title">Our Story</h2>
        <p>
          Appointment Online was born from the desire to simplify healthcare access. 
          We connect patients with verified doctors in every city, ensuring timely 
          appointments and trusted care. Our platform is fully responsive and mobile-friendly.
        </p>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <h2 className="section-title">Health Blogs</h2>
        <div className="blog-cards">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div className="blog-card" key={blog._id}>
                <img src={blog.image} alt={blog.title} />
                <div className="blog-body">
                  <h3>{blog.title}</h3>
                  <p>{blog.summary}</p>
                  <a href={`/blog/${blog._id}`} className="read-more">Read More</a>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available at the moment.</p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Book Your Appointment?</h2>
        <a href="/doctors" className="btn-primary">Find a Doctor</a>
      </section>
    </div>
  );
};

export default About;
