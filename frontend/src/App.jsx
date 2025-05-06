import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Navbar from '../pages/Navbar';
import Dashboard from '../pages/Dashbaord';
import ManageStudents from '../pages/ManageStudents';
import ViewStudents from '../pages/ViewStudents';
import VaccinationDrive from '../pages/VaccinationDrive';


const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarOnRoutes = ['/']; // Add any routes where navbar shouldn't be shown

  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ManageStudents" element={<ManageStudents />} />
        <Route path="/ViewStudents" element={<ViewStudents />} />
        <Route path="/VaccinationDrive" element={<VaccinationDrive />} />
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
