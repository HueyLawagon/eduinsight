'use client';

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';

const PLACEHOLDER_DATA = {
  totalStudents: 6,
  classAverage: 82.3,
  avgAttendance: 91.5,
  atRiskStudents: 1,
  avgScore: [85, 78, 92, 88],
  riskDistribution: [4, 1, 1] // low risk, medium risk, high risk
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-8">
      
      {/* Performance Dashboard Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Performance Dashboard</h3>
        
           {/* Stats Cards Row (responsive: min-size preserved, cards can grow/shrink) */}
           {/* Total students */}
           <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">Total Students</div>
                <div className="text-4xl font-bold text-gray-800">{PLACEHOLDER_DATA.totalStudents}</div>
              </div>
            </div>

            {/* Class average */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">Class Average</div>
                <div className="text-4xl font-bold text-gray-800">{PLACEHOLDER_DATA.classAverage}%</div>
              </div>
            </div>

            {/* Average attendance */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">Average Attendance</div>
                <div className="text-4xl font-bold text-gray-800">{PLACEHOLDER_DATA.avgAttendance}%</div>
              </div>
            </div>
            
            {/* At-risk students */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h-full">
                <div className="mb-2 font-bold">At-Risk Students</div>
                <div className="text-4xl font-bold text-gray-800">{PLACEHOLDER_DATA.atRiskStudents}</div>
              </div>
            </div>
           </div>
        
        {/* Subject Performance and Student Risk (side-by-side on md+, stacked on small screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch justify-items-center">
          {/* Subject Performance Column */}
          <div className="w-full max-w-full flex flex-col">
            <h4 className="font-medium mb-3 text-center md:text-left">Subject Performance</h4>
            <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm w-full flex-1"
                style={{minHeight: '14rem'}}>
              <div className="h-full w-full">
                <Bar data={{
                  labels: ['Math', 'Science', 'History', 'English'],
                  datasets: [{
                    label: 'Average Score',
                    data: PLACEHOLDER_DATA.avgScore,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                  }]
                }} options={{
                  responsive: true,
                  maintainAspectRatio: false, // This allows it to fill the container
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
          
          {/* Student Risk Distribution Column */}
          <div className="w-full max-w-full flex flex-col">
            <h4 className="font-medium mb-3 text-center md:text-left">Student Risk Distribution</h4>
            <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm w-full flex-1 flex items-center justify-center"
                style={{minHeight: '14rem'}}>
              <div className="h-full w-full flex items-center justify-center">
                <div style={{ height: '100%', width: '100%', maxHeight: '300px', maxWidth: '300px' }}>
                  <Pie data={{
                    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
                    datasets: [{
                      label: 'Risk Distribution',
                      data: PLACEHOLDER_DATA.riskDistribution,
                      backgroundColor: [
                        'rgba(34, 197, 94, 0.7)',
                        'rgba(253, 224, 71, 0.7)',
                        'rgba(239, 68, 68, 0.7)'
                      ],
                    }]
                  }} options={{
                    responsive: true,
                    maintainAspectRatio: true, // Keep this true to maintain circle shape
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

        {/* Grade Distribution as a single full-width card matching column heights */}
        <div className="mt-6 w-full">
          <h4 className="font-medium mb-3 text-left">Grade Distribution</h4>
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm w-full"
               style={{minHeight: '14rem'}}>
            <div className="space-y-3">
              <div className="w-full rounded-md bg-gray-50 p-3" style={{minHeight: '3rem'}}></div>
              <div className="w-full rounded-md bg-gray-50 p-3" style={{minHeight: '3rem'}}></div>
              <div className="w-full rounded-md bg-gray-50 p-3" style={{minHeight: '3rem'}}></div>
              <div className="w-full rounded-md bg-gray-50 p-3" style={{minHeight: '3rem'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}