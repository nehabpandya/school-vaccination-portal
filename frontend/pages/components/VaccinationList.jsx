import React, { useState, useEffect } from "react";
import $ from 'jquery';
import 'datatables.net';
import VaccinationDriveEditModal from "./EditVaccinationDrive"; // Assuming this is a form for drive, not student

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

    if (!response.ok) throw new Error('Failed to update Vaccination Drive');

    alert("Vaccination Drive VaccinationDriveEditModalupdated successfully.");
    return await response.json();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vaccination drive?")) {
      if ($.fn.DataTable.isDataTable('#vaccinationDriveTable')) {
        $('#vaccinationDriveTable').DataTable().destroy();
      }

      fetch(`http://localhost:5163/api/VaccinationDrive/${id}`, {
        method: "DELETE"
      })
        .then((res) => {
          if (res.ok) {
            const updatedList = vaccinationDrives.filter((drive) => drive.vaccineId !== id);
            setVaccinationDrives(updatedList);
          }
        })
        .catch((err) => console.error("Delete failed", err));
    }
  };

  useEffect(() => {
    let table;

    if (vaccinationDrives && vaccinationDrives.length > 0)
        {
        const timeout = setTimeout(() => {
        table = $('#vaccinationDriveTable').DataTable({
          scrollX: true,
          destroy: true,
        });
      }, 0);

      return () => {
        if ($.fn.DataTable.isDataTable('#vaccinationDriveTable')) {
          $('#vaccinationDriveTable').DataTable().destroy();
        }
        clearTimeout(timeout);
      };
    }
  }, [vaccinationDrives]);

  return (
    <>
      <div className="card p-4 bg-light mt-2">
        <h3 className="mb-4">Vaccination Drive List</h3>
        <table id="vaccinationDriveTable" className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Edit</th>
              <th>Delete</th>
              <th>VaccineId</th>
              <th>Vaccine Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {vaccinationDrives && vaccinationDrives.length > 0 ? (
              vaccinationDrives.map((drive, index) => (
                <tr key={index}>
                  <td>
                    <button className="btn btn-sm btn-warning me-2 m-1" onClick={() => handleEdit(drive)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-danger m-1" onClick={() => handleDelete(drive.vaccineId)}>
                      Delete
                    </button>
                  </td>
                  <td>{drive.vaccineId}</td>
                  <td>{drive.vaccineName}</td>
                  <td>{drive.description}</td>
                  <td>{drive.date}</td>
                  <td>{drive.location}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No vaccination drives found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <VaccinationDriveEditModal
        VaccinationDrive={vaccinationDrives}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (updateVaccinationDrive) => {
          try {
            await updateVaccinationDrive(updatedVaccinationDrive);
            setStudents(prev =>
              prev.map((s) => (s.id === updateVaccinationDrive.id ? updateVaccinationDrive : s))
            );
            setShowModal(false);
          } catch (error) {
            console.error('Error updating student:', error);
            alert("Failed to update student.");
          }
        }}
      />
    </>
  );
};

export default VaccinationDriveList;
