import React, { useEffect } from "react";
import $ from "jquery";

const StudentVaccinationReport = () => {
    const exportTableToExcel = (tableID, filename = '') => {
        const dataType = 'application/vnd.ms-excel';
        const tableSelect = document.getElementById(tableID);
        const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        filename = filename ? `${filename}.xls` : 'export.xls';

        if (navigator.msSaveOrOpenBlob) {
            const blob = new Blob(['\ufeff', tableHTML], { type: dataType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            downloadLink.download = filename;
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    };

    useEffect(() => {
        fetch("http://localhost:5163/api/ViewReports/student-vaccinations")
            .then(res => res.json())
            .then(data => {
                // Flatten data for DataTable
                const rows = data.flatMap(student =>
                    student.vaccinations.map(vac => ({
                        studentId: student.studentId,
                        studentName: student.studentName,
                        vaccineName: vac.vaccineName,
                        date: new Date(vac.date).toLocaleDateString(),
                        location: vac.location
                    }))
                );

                // Clear any previous table
                if ($.fn.DataTable.isDataTable("#reportTable")) {
                    $("#reportTable").DataTable().clear().destroy();
                }

                // Insert rows into table body
                const tbody = $("#reportTable tbody");
                tbody.empty();
                rows.forEach(row => {
                    tbody.append(`
            <tr>
              <td>${row.studentId}</td>
              <td>${row.studentName}</td>
              <td>${row.vaccineName}</td>
              <td>${row.date}</td>
              <td>${row.location}</td>
            </tr>
          `);
                });

                // Initialize DataTable
                $("#reportTable").DataTable({
                    dom: 'Bfrtip', // Enables Buttons
                    buttons: [
                        'excelHtml5', // Add other buttons like 'csv', 'print' as needed
                        'csvHtml5',
                        'print'
                    ],
                    destroy: true
                });
            });
    }, []);

    return (
        <div className="container mt-4">
            <div className="card p-4 bg-light">
                <h3 className="mb-4">Student Vaccination Report</h3>
                <div style={{ overflowX: "auto" }}>
                    <button
                        className="btn btn-success mb-3"
                        onClick={() => exportTableToExcel('reportTable', 'vaccination_report')}
                    >
                        Export to Excel
                    </button>
                    <table id="reportTable" className="display nowrap" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Vaccine</th>
                                <th>Date</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentVaccinationReport;
