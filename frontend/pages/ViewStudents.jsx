import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentUploadCSV from "./components/StudentUploadCSV";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  return (
   <StudentList></StudentList>
  );
};

export default ViewStudents;
