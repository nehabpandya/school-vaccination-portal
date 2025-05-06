import React, { useState,useEffect} from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentUploadCSV from "./components/StudentUploadCSV";


const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5163/api/student");
      const data = await response.json();
      setStudents(data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents(); // Load once on mount
  }, []);

  const handleAddStudent = async (studentData) => {
    try {
      const student = {
        studentId: studentData.studentId,
        name: studentData.name,
        class: studentData.class,
        dob: studentData.dob,
        parentName: studentData.parentName,
        contactNumber: studentData.contactNumber,
        gender: studentData.gender,
        vaccinated: studentData.vaccinated,
        vaccineType: null,           // <-- ADD
        doseNumber: null,            // <-- ADD
        vaccinationDate: null,       // <-- ADD
        medicalNote: studentData.medicalNote
      };
  
      const response = await fetch('http://localhost:5163/api/Student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      });
  
      if (!response.ok) {
        throw new Error('Failed to save student');
      }
  
      const data = await response.json();
      alert('Student saved successfully!' , data.student);
      console.log(data.student);
      setStudents(prev => [...prev, data.student]);
      // If needed, reset form or fetch students again
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving student. Please try again.');
    }
  };
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Students</h3>

      {/* Add/Edit Student Form */}
      <StudentForm onSubmit={handleAddStudent} buttonText="Add Student" />

      {/* CSV Upload for Bulk Import */}
      <StudentUploadCSV setStudents={setStudents} onUploadSuccess={fetchStudents}/>

      {/* Student List + Search */}
      <StudentList students={students} setStudents={setStudents}/>
    </div>
  );
};

export default ManageStudents;
