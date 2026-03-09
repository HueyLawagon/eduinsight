'use client';

export default function ReportsClient({ data }) {
  return (
    <div className="min-h-screen bg-white p-8">
      {/* Performance Dashboard Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Reports</h3>
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
              <div className="flex flex-col justify-between h/full">
                <div className="mb-2 font-bold">Class Average</div>
                <div className="text-4xl font-bold text-gray-800">{data.classAverage}%</div>
              </div>
            </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h/full">
                <div className="mb-2 font-bold">Low Risk Students</div>
                <div className="text-4xl font-bold text-gray-800">{data.riskDistribution[0]}</div>
              </div>
            </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '12rem', flex: '1 1 12rem'}}>
              <div className="flex flex-col justify-between h/full">
                <div className="mb-2 font-bold">At-Risk Students</div>
                <div className="text-4xl font-bold text-gray-800">{data.riskDistribution[2]}</div>
              </div>
            </div>
         </div>

        <div className="mt-8 w-full">
          <h4 className="font-bold text-lg mb-4 text-left text-gray-900">Report Configuration</h4>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-md w-full">
            <div className="space-y-6">
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
                      <input type="checkbox" id="lowRisk" className="w-5 h-5 accent-green-500 cursor-pointer rounded" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Low Risk</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                    <div className="relative flex items-center">
                      <input type="checkbox" id="mediumRisk" className="w-5 h-5 accent-yellow-500 cursor-pointer rounded" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Medium Risk</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                    <div className="relative flex items-center">
                      <input type="checkbox" id="highRisk" className="w-5 h-5 accent-red-500 cursor-pointer rounded" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">High Risk</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-gray-500">
                  ✓ Report will include all selected filters
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Export as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
