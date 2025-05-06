import React, { useState, useEffect } from "react";
import VaccinationForm from "./components/VaccinationForm"; // Assuming this is a form for drive, not student
import VaccinationDriveList from "./components/VaccinationList"; // Assuming this is a form for drive, not student

const VaccinationDrive = () => {
    const [vaccinationDrives, setVaccinationDrives] = useState([]);

  const fetchVaccinationDrives = async () => {

    try {
      const response = await fetch("http://localhost:5163/api/VaccinationDrive");
      const data = await response.json();
      setVaccinationDrives(data.vaccinationDrives);
      console.log(data); // backend returns { drives: [...] }
    } catch (error) {
      console.error("Error fetching vaccination drives:", error);
    }
  };

  useEffect(() => {
    fetchVaccinationDrives(); // Load once on mount
  }, []);

  const handleAddVaccinationDrives = async (vaccinationDriveData) => {
    try {
      const response = await fetch('http://localhost:5163/api/VaccinationDrive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vaccinationDriveData)
      });

      if (!response.ok) {
        throw new Error('Failed to save Vaccination Drive');
      }

      const data = await response.json();
      alert('Vaccination Drive saved successfully!');
      setVaccinationDrives(prev => [...prev, vaccinationDriveData]);

    } catch (error) {
      console.error('Error:', error);
      alert('Error saving Vaccination Drive. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Vaccination Drive</h3>

      {/* Vaccination Drive Form */}
      <VaccinationForm onSubmit={handleAddVaccinationDrives} buttonText="Add Vaccination Drive" />
      
      <VaccinationDriveList vaccinationDrives={vaccinationDrives || []} setVaccinationDrives={setVaccinationDrives}/>

    </div>
  );
};

export default VaccinationDrive;
