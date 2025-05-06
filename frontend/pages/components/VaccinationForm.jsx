import React, { useState } from 'react';

const VaccinationDriveForm = ({ initialData = {}, onSubmit, buttonText = "Save Drive" }) => {
  const [drive, setDrive] = useState({
    vaccineName: '',
    date: '',
    location: '',
    description: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrive((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(drive);
  };

  return (
    <div className='card p-4 bg-light'>
      <form onSubmit={handleSubmit}>
        <div className='row m-2'>
          <div className='col-4'>
            <label className='form-label'>Vaccine Name:</label>
            <input
              name="vaccineName"
              className='form-control'
              value={drive.vaccineName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label'>Date:</label>
            <input
              type="date"
              name="date"
              className='form-control'
              value={drive.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label'>Location:</label>
            <input
              name="location"
              className='form-control'
              value={drive.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='row m-2'>
          <div className='col-12'>
            <label className='form-label'>Description (optional):</label>
            <textarea
              name="description"
              className='form-control'
              value={drive.description}
              onChange={handleChange}
              placeholder="e.g. For students in Grade 1-5"
            />
          </div>
        </div>

        <div className='row m-2 mt-3'>
          <div className='col-3'>
            <button className="btn btn-primary" type="submit">{buttonText}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VaccinationDriveForm;
