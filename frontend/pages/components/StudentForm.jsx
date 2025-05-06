import React, { useState } from 'react';

const StudentForm = ({ initialData = {}, onSubmit, buttonText = "Save Student"}) => {
  const [student, setStudent] = useState({
    studentId: '',
    name: '',
    class: '',
    dob: '',
    parentName: '',
    contactNumber: '',
    gender: '',
    vaccinated: false,
    medicalNote: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(student);
  };

  return (
    <div className='card p-4 bg-light'>
      <form onSubmit={handleSubmit} className="student-form">
        <div className='row m-2'>
          <div className='col-3'>
            <label className='form-label' >Student ID:</label>
            <input name="studentId" className='form-control' value={student.studentId} onChange={handleChange} required />
          </div>
          <div className='col-3'>
            <label className='form-label'>Name:</label>
            <input name="name" className='form-control' value={student.name} onChange={handleChange} required />
          </div>
          <div className='col-3'>
            <label className='form-label'>Class:</label>
            <input name="class" className='form-control' value={student.class} onChange={handleChange} required />
          </div>
          <div className='col-3'>
            <label className='form-label'>Date of Birth:</label>
            <input type="date" name="dob" className='form-control' value={student.dob} onChange={handleChange} required />
          </div>
        </div>
        <div className='row m-2'>
          <div className='col-3'>
            <label className='form-label'>Parent/Guardian Name:</label>
            <input name="parentName" className='form-control' value={student.parentName} onChange={handleChange} required />
          </div>

          <div className='col-3'>
            <label className='form-label'>Contact Number:</label>
            <input type="tel" name="contactNumber" className='form-control' value={student.contactNumber} onChange={handleChange} required />
          </div>

          <div className='col-3 form-check'>
            <label className='form-label'>Gender:</label>
            <div className='d-flex'>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderMale"
                  value="Male"
                  onChange={handleChange}
                  checked={student.gender === 'Male'}
                />
                <label className="form-check-label m-1 " htmlFor="genderMale">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderFemale"
                  value="Female"
                  onChange={handleChange}
                  checked={student.gender === 'Female'}
                />
                <label className="form-check-label m-1" htmlFor="genderFemale">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderOther"
                  value="Other"
                  onChange={handleChange}
                  checked={student.gender === 'Other'}
                />
                <label className="form-check-label m-1" htmlFor="genderOther">
                  Other
                </label>
              </div>
             
            </div>
          </div>
          <div className='col-3'>
                <label className='form-label'>Medical Note:</label>
                <textarea name="medicalNote" className='form-control' value={student.medicalNote} onChange={handleChange} placeholder="e.g. Allergic to XYZ" />
           </div>
        </div>
        <div className='row m-2  mt-3'>
          <div className='col-3'>
            <button className="btn btn-primary" type="submit">{buttonText}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
