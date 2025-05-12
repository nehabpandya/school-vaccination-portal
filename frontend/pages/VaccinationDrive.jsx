import React, { useState, useEffect } from "react";
import VaccinationForm from "./components/VaccinationForm"; // Assuming this is a form for drive, not student
import VaccinationDriveList from "./components/VaccinationList"; // Assuming this is a form for drive, not student

const VaccinationDrive = () => {
    const [vaccinationDrives, setVaccinationDrives] = useState([]);

  const fetchVaccinationDrives = async () => {

    try {
      const response = await fetch("http://localhost:5163/api/VaccinationDrive");
      const data = await response.json();
      console.log(data.vaccinationDrives);
        // If the state is the same as the previous state, React won't trigger a re-render
    if (JSON.stringify(data.vaccinationDrives) !== JSON.stringify(vaccinationDrives)) {
      setVaccinationDrives(data.vaccinationDrives);
    }
     // setVaccinationDrives(data.vaccinationDrives);
    } catch (error) {
      console.error("Error fetching vaccination drives:", error);
    }
  };

  useEffect(() => {
      console.log('Current Vaccination Drives:', vaccinationDrives); // Log updated state

    fetchVaccinationDrives(); // Load once on mount
  }, []);

  const handleAddVaccinationDrives = async (vaccinationDriveData) => {
 try {
  const response = await fetch('http://localhost:5163/api/VaccinationDrive', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vaccinationDriveData)
  });

  const message = await response.text(); // plain string from server

  if (!response.ok) {
    alert("❌ " + message);  // Show the error from backend
    return;
  }

  alert("✅ Vaccination Drive saved successfully!");
  fetchVaccinationDrives();

} catch (error) {
  alert("❌ " + error.message); // fallback for network issues etc.
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
