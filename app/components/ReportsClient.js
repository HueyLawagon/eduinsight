'use client';

import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ReportsClient({ data }) {
  const [selectedRisks, setSelectedRisks] = useState({
    low: true,
    medium: true,
    high: true,
  });

  const handleRiskChange = (riskLevel) => {
    setSelectedRisks(prev => ({
      ...prev,
      [riskLevel]: !prev[riskLevel]
    }));
  };

  const getRiskKey = (riskValue) => {
    const first = (riskValue || '').toString().toUpperCase().split(' ')[0];
    if (first === 'LOW') return 'low';
    if (first === 'MEDIUM') return 'medium';
    return 'high';
  };

  const filteredStudents = data.students && data.students.filter(stu => {
    const riskKey = getRiskKey(stu.risk);
    return selectedRisks[riskKey];
  });

  const handleExportPDF = () => {
    if (!filteredStudents || filteredStudents.length === 0) {
      alert('No students to export. Please select at least one risk level.');
      return;
    }

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Add title
      pdf.setFontSize(16);
      pdf.text('Student Report', pdf.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
      
      // Add date
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pdf.internal.pageSize.getWidth() / 2, 22, { align: 'center' });

      // Prepare table data
      const tableData = filteredStudents.map(stu => {
        const riskValue = (stu.risk || '').toString().toUpperCase().split(' ')[0];
        return [
          stu.name,
          stu.grade + '%',
          stu.math,
          stu.science,
          stu.history,
          stu.english,
          stu.attendance + '%',
          stu.missing,
          riskValue,
        ];
      });

      // Generate table
      autoTable(pdf, {
        head: [['Name', 'Grade', 'Math', 'Science', 'History', 'English', 'Attendance', 'Missing', 'Risk']],
        body: tableData,
        startY: 30,
        margin: { top: 30, right: 10, bottom: 10, left: 10 },
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [66, 133, 244],
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        didDrawCell: (data) => {
          // Color the Risk column based on value
          if (data.column.index === 8) {
            const cellValue = data.cell.text[0];
            if (cellValue === 'LOW') {
              data.cell.styles.fillColor = [200, 230, 201];
            } else if (cellValue === 'MEDIUM') {
              data.cell.styles.fillColor = [255, 243, 224];
            } else if (cellValue === 'HIGH') {
              data.cell.styles.fillColor = [255, 205, 210];
            }
          }
        },
      });

      pdf.save('student-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Performance Dashboard Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Reports</h3>
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          {/* Total Students */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">Total Students</div>
                <div className="text-4xl font-bold text-gray-800">{data.totalStudents}</div>
              </div>
            </div>

          {/* Class Average */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">Class Average</div>
                <div className="text-4xl font-bold text-gray-800">{data.classAverage}%</div>
              </div>
            </div>

          {/* Low Risk Students */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold text-green-600">Low Risk Students</div>
                <div className="text-4xl font-bold text-green-600">{data.riskDistribution[0]}</div>
              </div>
            </div>

          {/* At-Risk Students */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold text-red-600">At-Risk Students</div>
                <div className="text-4xl font-bold text-red-600">{data.riskDistribution[2]}</div>
              </div>
            </div>
         </div>

          {/* Report Configuration Section */}
        <div className="mt-8 w-full">
          <h4 className="font-bold text-lg mb-4 text-left text-gray-900">Report Configuration</h4>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-md w-full">
            <div className="space-y-6">
              {/* Filter by Risk Level Section */}
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h5 className="font-semibold text-gray-900">Filter by Risk Level</h5>
                </div>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedRisks.low}
                        onChange={() => handleRiskChange('low')}
                        className="w-5 h-5 accent-green-500 cursor-pointer rounded" 
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Low Risk</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedRisks.medium}
                        onChange={() => handleRiskChange('medium')}
                        className="w-5 h-5 accent-yellow-500 cursor-pointer rounded" 
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Medium Risk</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedRisks.high}
                        onChange={() => handleRiskChange('high')}
                        className="w-5 h-5 accent-red-500 cursor-pointer rounded" 
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">High Risk</span>
                  </label>
                </div>
              </div>

              {/* Export as PDF Button Section */}
              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-gray-500">
                  ✓ Report will include {filteredStudents?.length || 0} student(s) with selected filters
                </p>
                <button 
                  onClick={handleExportPDF}
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Export as PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Data */}
        <div className="mt-6 w-full">
          <h4 className="font-bold mb-3 text-center md:text-left">Student Data</h4>
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Math</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Science</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">History</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">English</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Missing</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents && filteredStudents.map((stu, idx) => {
                  // determine color based on risk level (case-insensitive)
                  const riskValue = (stu.risk || '').toString().toUpperCase().split(' ')[0];
                  const riskClass = riskValue === 'LOW' ? 'bg-green-100 text-green-800' :
                                     riskValue === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                     'bg-red-100 text-red-800';
                  const level = (stu.risk || '').toString().toUpperCase();
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stu.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stu.grade}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stu.math}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stu.science}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stu.history}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stu.english}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stu.attendance}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stu.missing}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${riskClass}`}>{level}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
