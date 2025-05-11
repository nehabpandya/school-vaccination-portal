import React, { useState, useEffect, useRef } from 'react';

const VaccinationDriveForm = ({ initialData = {}, onSubmit, buttonText = "Save Drive" }) => {
  const [drive, setDrive] = useState({
    vaccineName: '',
    date: '',
    location: '',
    description: '',
    dose: '',
  });

  // Ref to track whether initialData has been applied
  const initialized = useRef(false);

  useEffect(() => {
    // Only set drive state once based on initialData
    if (initialData && !initialized.current) {
      setDrive({
        vaccineName: initialData.vaccineName || '',
        date: initialData.date || '',
        location: initialData.location || '',
        description: initialData.description || '',
        dose: initialData.dose || '',
      });
      initialized.current = true; // Set initialized flag
    }
  }, [initialData]);

  // Check if the drive is in the past
  const isPastDrive = drive.date && new Date(drive.date) < new Date();

  // Calculate 15 days ahead date string
  const minDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrive((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const selectedDate = new Date(drive.date);
    const diffInDays = (selectedDate - today) / (1000 * 60 * 60 * 24);

    if (diffInDays < 15) {
      alert("Drive must be scheduled at least 15 days in advance.");
      return;
    }

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
              disabled={isPastDrive}
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
              min={minDate}
              disabled={isPastDrive}
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
              disabled={isPastDrive}
            />
          </div>
        </div>

        <div className='row m-2'>
          <div className='col-3'>
            <label className='form-label'>No of Dose Available:</label>
            <input
              name="dose"
              type="number"
              min="0"
              className='form-control'
              value={drive.dose}
              onChange={handleChange}
              disabled={isPastDrive}
            />
          </div>
          <div className='col-9'>
            <label className='form-label'>Description (optional):</label>
            <textarea
              name="description"
              className='form-control'
              value={drive.description}
              onChange={handleChange}
              placeholder="e.g. For students in Grade 1-5"
              disabled={isPastDrive}
            />
          </div>
        </div>

        <div className='row m-2 mt-3'>
          <div className='col-3'>
            <button className="btn btn-primary" type="submit" disabled={isPastDrive}>
              {buttonText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VaccinationDriveForm;
