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
                <div className="text-4xl font-bold text-gray-800">{data.riskDistribution[1]}</div>
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

        <div className="mt-6 w-full">
          <h4 className="font-semibold mb-3 text-left">Report Configuration</h4>
          <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm w-full">
            <div className="space-y-5">
              <div>
                <h5 className="font-medium text-sm text-gray-700 mb-2">Filter by Risk Level</h5>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="lowRisk" className="rounded border-gray-300" />
                    <label htmlFor="lowRisk" className="text-sm">Low Risk</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="mediumRisk" className="rounded border-gray-300" />
                    <label htmlFor="mediumRisk" className="text-sm">Medium Risk</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="highRisk" className="rounded border-gray-300" />
                    <label htmlFor="highRisk" className="text-sm">High Risk</label>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h5 className="font-medium text-sm text-gray-700 mb-2">Reporting Period</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      defaultValue="2024-01-01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      defaultValue="2024-12-31"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                  Export as PDF
                </button>
              </div>

              <p className="text-xs text-gray-400 text-right">
                Report will include all selected filters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
