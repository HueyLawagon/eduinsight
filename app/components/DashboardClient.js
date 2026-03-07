'use client';

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';

export default function DashboardClient({ data }) {
  // data should contain the same shape that PLACEHOLDER_DATA used to have
  return (
    <div className="min-h-screen bg-white pb-8 px-8">
      {/* Performance Dashboard Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Performance Dashboard</h3>

        {/* Stats Cards Row (responsive: min-size preserved, cards can grow/shrink) */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">Total Students</div>
                <div className="text-4xl font-bold text-gray-800">{data.totalStudents}</div>
              </div>
            </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">Class Average</div>
                <div className="text-4xl font-bold text-gray-800">{data.classAverage}%</div>
              </div>
            </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">Average Attendance</div>
                <div className="text-4xl font-bold text-gray-800">{data.avgAttendance}%</div>
              </div>
            </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">At-Risk Students</div>
                <div className="text-4xl font-bold text-gray-800">{data.riskDistribution[2]}</div>
              </div>
            </div>
         </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch justify-items-center">
          <div className="w-full max-w-full flex flex-col">
            <h4 className="font-bold mb-3 text-center md:text-left">Subject Performance</h4>
            <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm w/full flex-1"
                style={{minHeight: '14rem'}}>
              <div className="h-full w-full">
                <Bar data={{
                  labels: ['Math', 'Science', 'History', 'English'],
                  datasets: [{
                    label: 'Average Score',
                    data: data.avgScore,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                  }]
                }} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      grid: { color: 'rgba(0,0,0,0.1)' }
                    }
                  }
                }} />
              </div>
            </div>
          </div>

          <div className="w-full max-w-full flex flex-col">
            <h4 className="font-bold mb-3 text-center md:text-left">Student Risk Distribution</h4>
            <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm w/full flex-1 flex items-center justify-center"
                style={{minHeight: '14rem'}}>
              <div className="h-full w/full flex items-center justify-center">
                <div style={{ height: '100%', width: '100%', maxHeight: '300px', maxWidth: '300px' }}>
                  <Pie data={{
                    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
                    datasets: [{
                      label: 'Risk Distribution',
                      data: data.riskDistribution,
                      backgroundColor: [
                        'rgba(34, 197, 94, 0.7)',
                        'rgba(253, 224, 71, 0.7)',
                        'rgba(239, 68, 68, 0.7)'
                      ],
                    }]
                  }} options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { boxWidth: 12, font: { size: 10 } }
                      }
                    }
                  }}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <h4 className="font-bold mb-3 text-left">Grade Distribution</h4>
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm w/full"
              style={{minHeight: '14rem'}}>
            <div className="space-y-4">
              {[
                { range: '90-100', count: data.gradeDistribution?.[0], color: 'bg-green-500' },
                { range: '80-89', count: data.gradeDistribution?.[1], color: 'bg-blue-500' },
                { range: '70-79', count: data.gradeDistribution?.[2], color: 'bg-yellow-500' },
                { range: 'Below 70', count: data.gradeDistribution?.[3], color: 'bg-red-500' }
              ].map((item, index) => {
                const percentage = Math.min((item.count / data.totalStudents) * 100, 100);
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-16 text-sm font-medium">{item.range}</div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full`} 
                        style={{width: `${percentage}%`}}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-right">{item.count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 w/full">
          <h4 className="font-bold mb-3 text-center md:text-left">Student Overview</h4>
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm w/full">
            <div className="space-y-4">
              {data.students.map((student, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-lg">{student.name}</h5>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      student.risk === 'Low Risk' ? 'bg-green-100 text-green-700' :
                      student.risk === 'Medium Risk' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {student.risk}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Grade</p>
                      <p className="font-medium">{student.grade}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Attendance</p>
                      <p className="font-medium">{student.attendance}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Missing</p>
                      <p className="font-medium">{student.missing}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Predicted</p>
                      <p className="font-medium">{student.predicted}%</p>
                    </div>
                  </div>
                  {index < data.students.length - 1 && (
                    <hr className="border-gray-200 my-3" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
