import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Navbar from '../pages/Navbar';
import Dashboard from '../pages/Dashboard';
import ManageStudents from '../pages/ManageStudents';
import ViewStudents from '../pages/ViewStudents';
import VaccinationDrive from '../pages/VaccinationDrive';
import StudentVaccination from '../pages/StudentVaccination';
import ViewReports from '../pages/ViewReports';


const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarOnRoutes = ['/']; // Add any routes where navbar shouldn't be shown

  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/ManageStudents" element={<ManageStudents />} />
        <Route path="/ViewStudents" element={<ViewStudents />} />
        <Route path="/VaccinationDrive" element={<VaccinationDrive />} />
        <Route path="/StudentVaccination" element={<StudentVaccination />} />
        <Route path="/ViewReports" element={<ViewReports />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}


export default App
