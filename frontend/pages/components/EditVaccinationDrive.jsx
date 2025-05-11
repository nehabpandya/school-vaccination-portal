import React from "react";
import Model from "./Model";
import VaccinationForm from "./VaccinationForm"; // Assuming you have this component

const VaccinationDriveEditModal = ({ VaccinationDrive, show, onClose, onSave }) => {
  return (
    <Model title="Edit Vaccination Drive" show={show} onClose={onClose}>
      <VaccinationForm initialData={VaccinationDrive} onSubmit={onSave} buttonText="Update" />
    </Model>
  );
};

export default VaccinationDriveEditModal;
