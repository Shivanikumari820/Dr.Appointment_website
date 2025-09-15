import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Appointments from "./pages/Appointments"; // make sure this file exists

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Appointments" element={<Appointments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
