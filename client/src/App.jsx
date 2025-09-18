import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Appointments from "./pages/GetAppointment";
import DoctorDashBoard from "./DoctorDashBoard";
import PatientList from "./pages/PatientList";
import Doctors from "./pages/Doctors";
import About from './pages/About';
import Contact from './pages/Contact';
import GetAppointment from './pages/GetAppointment';

const App = () => { 
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="about" element={<About />} />
          <Route path="contactus" element={<Contact />} />
          <Route path="getappointment/:id" element={<GetAppointment />} />
        </Route>

        {/* Doctor Dashboard */}
        <Route path="/doctordashboard" element={<DoctorDashBoard />}>
          <Route path="patientlist" element={<PatientList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
