import React, { useState, useEffect } from "react";
const StudentVaccinationList = ({
  students = [],          // <-- default value
  drives = [],
  vaccinatedStudents = [],
  setVaccinatedStudents }
) => {
  const [selectedDrive, setSelectedDrive] = useState(null);

  const handleVaccinate = async (studentId) => {
    console.log(studentId);
    if (!selectedDrive) {
      alert("Please select a vaccination drive first.");
      return;
    }
    console.log(selectedDrive);
    const alreadyVaccinated = vaccinatedStudents.find(v =>
      v.studentId === studentId && v.driveId === selectedDrive?.vaccineId
    );
    if (alreadyVaccinated) {
      alert("This student is already vaccinated for this drive.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5163/api/VaccinationDrive/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studentId: studentId,
          driveId: selectedDrive.vaccineId
        })
      });

      if (!response.ok) throw new Error("Failed to mark as vaccinated");

      const result = await response.json();
      alert("Vaccination recorded!");
      setVaccinatedStudents(prev => [...prev, result]);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to vaccinate student.");
    }
  };

  useEffect(() => {
    let table;

    if (students.length > 0) {
      const timeout = setTimeout(() => {
        table = $('#studentTable').DataTable({
          scrollX: true,
          destroy: true,
        });
      }, 0);

      return () => {
        if ($.fn.DataTable.isDataTable('#studentTable')) {
          $('#studentTable').DataTable().destroy();
        }
        clearTimeout(timeout);
      };
    }
  }, [students]);

  return (
    <div className="container mt-4">
      <div className="card p-4 bg-light mt-2">
        <h3 className="mb-4">Mark Students as Vaccinated</h3>
        <div className="row mb-3">
          <div className="col-3 ">
            <label htmlFor="driveSelect" className="form-label">Select Vaccination Drive:</label>
            <select
              id="driveSelect"
              className="form-select"
              value={selectedDrive?.vaccineId || ""} // Extract ID from object for binding
              onChange={(e) => {
                const selected = drives.find((d) => d.vaccineId === parseInt(e.target.value));
                setSelectedDrive(selected);
              }}
            >
              <option value="">-- Select Drive --</option>
              {drives.map((drive) => (
                <option key={drive.vaccineId} value={drive.vaccineId}>
                  {drive.vaccineName} - {new Date(drive.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <table id="studentTable" className="table table-striped table-bordered" style={{ width: '100%' }}>
            <thead className="thead-dark">
              <tr>
                <th>Status</th>
                <th>StudentId</th>
                <th>Name</th>
                <th>Class</th>
                <th>DateOfBirth</th>
                <th>ParentName</th>
                <th>MedicalNote</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => {
                  const alreadyVaccinated = vaccinatedStudents.find(v =>
                    v.studentId === student.id && v.driveId === selectedDrive?.vaccineId
                  );
                  return (
                    <tr key={index}>
                      <td>
                        {alreadyVaccinated ? (
                          <span className="text-success">Already Vaccinated</span>
                        ) : (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleVaccinate(student.id)}
                          >
                            Vaccinate
                          </button>
                        )}
                      </td>
                      <td>{student.studentId}</td>
                      <td>{student.name}</td>
                      <td>{student.class}</td>
                      <td>{student.dateOfBirth}</td>
                      <td>{student.parentName}</td>
                      <td>{student.medicalNote}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentVaccinationList;
