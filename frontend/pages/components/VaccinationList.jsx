import React, { useState } from "react";
import VaccinationDriveEditModal from "./EditVaccinationDrive";

const VaccinationDriveList = ({ vaccinationDrives, setVaccinationDrives }) => {
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (drive) => {
    setSelectedDrive(drive);
    setShowModal(true);
  };

  const updateVaccinationDrive = async (updatedDrive) => {
    const response = await fetch(`http://localhost:5163/api/VaccinationDrive/${updatedDrive.vaccineId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDrive),
    });

    if (!response.ok) {
      throw new Error('Failed to update Vaccination Drive');
    }

    alert("Vaccination drive updated successfully.");
    return await response.json();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vaccination drive?")) {
      try {
        const res = await fetch(`http://localhost:5163/api/VaccinationDrive/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          const updatedList = vaccinationDrives.filter((drive) => drive.vaccineId !== id);
          setVaccinationDrives(updatedList);
        } else {
          alert("Failed to delete vaccination drive.");
        }
      } catch (err) {
        console.error("Delete failed", err);
        alert("Error occurred while deleting vaccination drive.");
      }
    }
  };

  const isPastDrive = (dateStr) => {
    const driveDate = new Date(dateStr);
    const today = new Date();
    return driveDate < today;
  };

  const isLessThan15Days = (dateStr) => {
    const driveDate = new Date(dateStr);
    const minAllowedDate = new Date();
    minAllowedDate.setDate(minAllowedDate.getDate() + 15);
    return driveDate < minAllowedDate;
  };

  return (
    <>
      <div className="card p-4 bg-light mt-2">
        <h3 className="mb-4">Vaccination Drive List</h3>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Edit</th>
                <th>Delete</th>
                <th>VaccineId</th>
                <th>Vaccine Name</th>
                <th>Description</th>
                <th>No of Dose Available</th>
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {vaccinationDrives && vaccinationDrives.length > 0 ? (
                vaccinationDrives.map((drive, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2 m-1"
                        onClick={() => handleEdit(drive)}
                        disabled={isPastDrive(drive.date)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger m-1"
                        onClick={() => handleDelete(drive.vaccineId)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>{drive.vaccineId}</td>
                    <td>{drive.vaccineName}</td>
                    <td>{drive.description}</td>
                    <td>{drive.dose}</td>
                    <td>{drive.date}</td>
                    <td>{drive.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No vaccination drives found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <VaccinationDriveEditModal
        VaccinationDrive={selectedDrive}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (updatedDrive) => {
          try {
            if (isLessThan15Days(updatedDrive.date)) {
              alert("Drive must be scheduled at least 15 days in advance.");
              return;
            }

            const updated = await updateVaccinationDrive(updatedDrive);
            setVaccinationDrives((prev) =>
              prev.map((drive) =>
                drive.vaccineId === updatedDrive.vaccineId ? updatedDrive : drive
              )
            );
            setShowModal(false);
          } catch (error) {
            console.error('Error updating drive:', error);
            alert("Failed to update vaccination drive.");
          }
        }}
      />
    </>
  );
};

export default VaccinationDriveList;
