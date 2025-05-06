import React, { useState } from "react";
import Papa from "papaparse";

const StudentUploadCSV = ({ onUploadSuccess }) => {
  const [students, setStudents] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file?.name || "");
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setStudents(results.data);
        },
      });
    }
  };

  const handleUpload = () => {
    const fileInput = document.querySelector("input[type='file']");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5163/api/student/upload-file", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`${data.count} students uploaded successfully.`);
        setStudents([]);
        if (onUploadSuccess) {
          onUploadSuccess(); // ✅ trigger refresh
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        alert("Upload failed.");
      });

     
  };

  const handleDownloadFormat = () => {
    window.location.href = "/sample/student_upload_template.csv";
  };

  return (
    <>
      <div className="card p-4 bg-light mt-2">
        <div className="row">
          <div className="col-4">
            <h3 className="mb-4">Upload Students Using CSV</h3>
          </div>
          <div className="col-3">
            <button className="btn btn-primary mb-3" onClick={handleDownloadFormat}>
              Download CSV Format
            </button>

          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <input type="file" accept=".csv" onChange={handleFileChange} className="form-control mb-3" />

          </div>
         
        </div>
        {students.length > 0 && (
          <>
            <div className="mb-3">
              <strong>Preview ({students.length} records):</strong>
              <table className="table table-bordered mt-2">
                <thead>
                  <tr>
                    {Object.keys(students[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      {Object.values(student).map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="btn btn-success" onClick={handleUpload}>
              Upload to Server
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default StudentUploadCSV;
