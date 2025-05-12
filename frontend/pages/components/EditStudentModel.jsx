import React from "react";
import Model from "./Model";
import StudentForm from "./StudentForm"; // Assuming you have this component

const StudentEditModal = ({ student, show, onClose, onSave }) => {
  console.log(student);
  return (
    <Model title="Edit Student" show={show} onClose={onClose}>
      <StudentForm initialData={student} onSubmit={onSave} buttonText="Update Student" />
    </Model>
  );
};

export default StudentEditModal;
