import React, { useState } from "react";
import "../css/Appointments.css";

const doctorsData = [
  { id: 1, name: "Dr. Mehedi Hasan", degree: "MBBS, BCS", institution: "Bangabandhu SMU", specialties: ["General Physician", "Pediatrics"], rating: 4.6, reviews: 8.5, fee: 410, oldFee: 510, experience: 10, imageUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Dr. Shafwanur Hasan", degree: "MBBS, BCS", institution: "TMSS Medical College", specialties: ["General Physician", "Pediatrics"], rating: 4.5, reviews: 10.5, fee: 399, oldFee: 450, experience: 13, imageUrl: "https://randomuser.me/api/portraits/men/44.jpg" },
  { id: 3, name: "Dr. Suvashini", degree: "MBBS, BCS", institution: "Bangabandhu SMU", specialties: ["General Physician", "Pediatrics"], rating: 5, reviews: 7.5, fee: 500, oldFee: 510, experience: 7, imageUrl: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 4, name: "Dr. Ananya Sharma", degree: "MBBS, MD", institution: "AIIMS, Delhi", specialties: ["Cardiologist"], rating: 4.8, reviews: 12, fee: 800, oldFee: 900, experience: 12, imageUrl: "https://randomuser.me/api/portraits/women/45.jpg" },
  { id: 5, name: "Dr. Rajiv Kapoor", degree: "MBBS, MS", institution: "Fortis Hospital", specialties: ["Orthopedic"], rating: 4.4, reviews: 15, fee: 700, oldFee: 850, experience: 9, imageUrl: "https://randomuser.me/api/portraits/men/55.jpg" },
  { id: 6, name: "Dr. Priya Menon", degree: "MBBS, MD", institution: "Apollo Hospital", specialties: ["Gynecologist"], rating: 4.9, reviews: 9, fee: 650, oldFee: 750, experience: 11, imageUrl: "https://randomuser.me/api/portraits/women/30.jpg" },
  { id: 7, name: "Dr. Arjun Verma", degree: "MBBS, MD", institution: "AIIMS, Delhi", specialties: ["Neurologist"], rating: 4.7, reviews: 10, fee: 900, oldFee: 1050, experience: 14, imageUrl: "https://randomuser.me/api/portraits/men/60.jpg" },
  { id: 8, name: "Dr. Kavita Reddy", degree: "MBBS, MD", institution: "Apollo Hospital", specialties: ["Dermatologist"], rating: 4.6, reviews: 8, fee: 500, oldFee: 600, experience: 8, imageUrl: "https://randomuser.me/api/portraits/women/35.jpg" },
];

const Appointments = () => {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [feeRange, setFeeRange] = useState(1000);
  const [mode, setMode] = useState({ online: false, next2hrs: false, today: false });
  const [gender, setGender] = useState({ male: false, female: false });

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = specialty === "" || doc.specialties.includes(specialty);
    const matchesFee = doc.fee <= feeRange;
    return matchesSearch && matchesSpecialty && matchesFee;
  });

  return (
    <div className="appointments-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Filters</h3>

        <label>Specialty</label>
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option value="">All</option>
          <option value="General Physician">General Physician</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Dermatologist">Dermatologist</option>
        </select>

        <label>Consultation Fee: Up to ৳{feeRange}</label>
        <input type="range" min="0" max="1000" value={feeRange} onChange={(e) => setFeeRange(Number(e.target.value))} />

        <label>Mode of Consult</label>
        <label><input type="checkbox" checked={mode.online} onChange={() => setMode(prev => ({ ...prev, online: !prev.online }))} /> Online Now</label>
        <label><input type="checkbox" checked={mode.next2hrs} onChange={() => setMode(prev => ({ ...prev, next2hrs: !prev.next2hrs }))} /> Available in next 2 hours</label>
        <label><input type="checkbox" checked={mode.today} onChange={() => setMode(prev => ({ ...prev, today: !prev.today }))} /> Available today</label>

        <label>Gender</label>
        <label><input type="checkbox" checked={gender.male} onChange={() => setGender(prev => ({ ...prev, male: !prev.male }))} /> Male</label>
        <label><input type="checkbox" checked={gender.female} onChange={() => setGender(prev => ({ ...prev, female: !prev.female }))} /> Female</label>

        <label>Sort by Rating</label>
        <div style={{ color: "orange", fontSize: "18px" }}>★★★★★</div>

        <button onClick={() => { setSearch(""); setSpecialty(""); setFeeRange(1000); setMode({ online: false, next2hrs: false, today: false }); setGender({ male: false, female: false }); }}>Clear All</button>
      </div>

      {/* Main Listing */}
      <div className="doctor-list">
        <div className="search-bar">
          <input type="text" placeholder="Search doctor by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button>Search</button>
        </div>

        {filteredDoctors.length === 0 ? <p>No doctors found.</p> : filteredDoctors.map(doc => (
          <div key={doc.id} className="doctor-card">
            <img src={doc.imageUrl} alt={doc.name} />
            <div className="doctor-info">
              <h4>{doc.name}</h4>
              <p>{doc.degree}</p>
              <p>{doc.institution}</p>
              <p>Specialties: {doc.specialties.join(", ")}</p>
              <p>Rating: ★ {doc.rating} ({doc.reviews}k reviews)</p>
            </div>
            <div className="doctor-actions">
              <p>৳{doc.fee} <span className="old-fee">৳{doc.oldFee}</span></p>
              <p>Experience: {doc.experience}+ yrs</p>
              <button className="btn-profile">View Profile</button>
              <button className="btn-book">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
