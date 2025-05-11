import React, { useState, useEffect } from 'react';
import StudentVaccinationList from './StudentVaccinationList';

const VaccinationPage = () => {
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);
  const [vaccinatedStudents, setVaccinatedStudents] = useState([]);

  useEffect(() => {
    // Fetch students
    fetch('http://localhost:5163/api/Student')
      .then(res => res.json())
      .then(data => setStudents(data.students))
      .catch(err => console.error("Failed to fetch students", err));

    // Fetch vaccination drives 
    fetch('http://localhost:5163/api/VaccinationDrive')
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data.vaccinationDrives)) {
          setDrives(data.vaccinationDrives); // ✅ Correct access
        } else {
          console.error("Expected array but got:", data);
          setDrives([]);
        }
      })
      
    .catch(err => {
      console.error("Failed to fetch drives", err);
      setDrives([]);
    });

    // Fetch already vaccinated records
    fetch('http://localhost:5163/api/VaccinationDrive/stdvaccinationrecords')
      .then(res => res.json())
      .then(data => setVaccinatedStudents(data))
      .catch(err => console.error("Failed to fetch vaccination records", err));
  }, []);

  return (
    <div className="container">
      <StudentVaccinationList
        students={students}
        drives={drives}
        vaccinatedStudents={vaccinatedStudents}
        setVaccinatedStudents={setVaccinatedStudents}
      />
    </div>
  );
};

export default VaccinationPage;
