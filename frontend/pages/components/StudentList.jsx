import React, { useState, useEffect } from "react";
import $ from 'jquery';
import 'datatables.net';
import StudentEditModal from './EditStudentModel';


const StudentList = ({ students, setStudents }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowModal(true); // This triggers the modal to open
  };

  const updateStudent = async (student) => {
    const response = await fetch(`http://localhost:5163/api/student/${student.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error('Failed to update student');
    }
    alert("student updated.");
    return await response.json();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      // Destroy DataTable before changing the DOM
      if ($.fn.DataTable.isDataTable('#studentTable')) {
        $('#studentTable').DataTable().destroy();
      }

      fetch(`http://localhost:5163/api/student/${id}`, {
        method: "DELETE"
      })
        .then((res) => {
          if (res.ok) {
            const updatedStudents = students.filter((s) => s.id !== id);
            setStudents(updatedStudents);
          }
        })
        .catch((err) => console.error("Delete failed", err));
    }
  };


  

  useEffect(() => {
    let table;

    // Only initialize if students are available
    if (students.length > 0) {
      const timeout = setTimeout(() => {
        table = $('#studentTable').DataTable({
          scrollX: true,
          destroy: true, // <-- Important for reinitialization
        });
      }, 1000); // delay to ensure DOM is updated

      return () => {
        if ($.fn.DataTable.isDataTable('#studentTable')) {
          $('#studentTable').DataTable().destroy();
        }
        clearTimeout(timeout);
      };
    }
  }, [students]);


  return (
<>
      <div className="card p-4 bg-light mt-2">
        <h3 className="mb-4">Students List</h3>
        <table id="studentTable" className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Edit</th>
              <th>Delete</th>
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
              students.map((student, index) => (
                <tr key={index}>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2 m-1"
                      onClick={() => handleEdit(student)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger m-1"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.dateOfBirth}</td>
                  <td>{student.parentName}</td>
                  <td>{student.medicalNote}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <StudentEditModal
        student={selectedStudent}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (updatedStudent) => {
          try {
            await updateStudent(updatedStudent);
            setStudents(prev =>
              prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
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

export default StudentList;
