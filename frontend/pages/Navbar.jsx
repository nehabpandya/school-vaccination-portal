import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-blue-bg">
          <div className="container-fluid">
            <a className="navbar-brand custom-brand me-5" href="#">
              School Vaccination Portal
            </a>
        
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                 <NavLink className="nav-link" to="/ManageStudents"> Manage Student Data</NavLink>
                </li>
                <li className="nav-item">
                 <NavLink className="nav-link" to="/VaccinationDrive"> Manage Vaccination Drives</NavLink>
                </li>
                <li className="nav-item">
                 <NavLink className="nav-link" to="/StudentVaccination"> Manage Student Vaccination</NavLink>
                </li>
                <li className="nav-item">
                 <NavLink className="nav-link" to="/ViewReports"> View Reports</NavLink>
                </li>
              </ul>
        
              {/* Profile Dropdown */}
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_1280.png"
                      alt="Avatar"
                      className="rounded-circle me-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                    Neha
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
                    </li>
                    
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
    );
};

export default Navbar;
