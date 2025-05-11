import React, { useEffect, useRef, useState } from 'react';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5163/api/overview')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Vaccinated', 'Not Vaccinated'],
          datasets: [
            {
              label: 'Vaccination Status',
              data: [data.vaccinatedStudents, data.totalStudents - data.vaccinatedStudents],
              backgroundColor: ['#4CAF50', '#F44336'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }, [data]);

  if (loading) return <p className="p-4">Loading...</p>;

  const {
    totalStudents,
    vaccinatedStudents,
    vaccinatedPercentage,
    upcomingDrives
  } = data;

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Dashboard Overview</h2>
      <div className="row g-4">
        {/* Pie Chart */}
        <div className="col-md-4">
          <div className="card shadow-sm border-primary h-100">
            <div className="card-body text-center">
              <h6 className="text-muted mb-3">Vaccination Coverage</h6>
              <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
                <canvas ref={chartRef} style={{ width: '250px', height: '250px' }}></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards on the Right */}
        <div className="col-md-8">
          <div className="row g-4">
            {/* Total Students */}
            <div className="col-md-6">
              <div className="card shadow-sm border-primary">
                <div className="card-body">
                  <h6 className="text-muted">Total Students</h6>
                  <h4 className="fw-semibold">{totalStudents}</h4>
                </div>
              </div>
            </div>

            {/* Vaccinated Students */}
            <div className="col-md-6">
              <div className="card shadow-sm border-primary">
                <div className="card-body">
                  <h6 className="text-muted">Vaccinated Students</h6>
                  <h4 className="fw-semibold">
                    {vaccinatedStudents} ({vaccinatedPercentage.toFixed(2)}%)
                  </h4>
                </div>
              </div>
            </div>

            {/* Upcoming Drives - spans full width */}
            <div className="col-md-12">
              <div className="card shadow-sm border-primary">
                <div className="card-body">
                  <h6 className="text-muted">Upcoming Vaccination Drives</h6>
                  {upcomingDrives.length > 0 ? (
                    <ul className="list-unstyled mt-2">
                      {upcomingDrives.map((drive) => (
                        <li key={drive.vaccineId}>
                          <strong>{drive.vaccineName}</strong> – {drive.date}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted mt-2">No upcoming drives in the next 30 days.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
