// app/page.js
export default function Home() {
  return (
    <div className="min-h-screen bg-white p-8">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      
      {/* EduInsight Subheader */}
      <h2 className="text-2xl font-semibold mb-6">EduInsight</h2>
      
      {/* Performance Dashboard Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Performance Dashboard</h3>
        
        {/* Stats Cards Row */}
        <div className="flex gap-4 mb-8">
          <div className="border border-gray-300 rounded-lg p-4 w-48 h-24 bg-white shadow-sm"></div>
          <div className="border border-gray-300 rounded-lg p-4 w-48 h-24 bg-white shadow-sm"></div>
          <div className="border border-gray-300 rounded-lg p-4 w-48 h-24 bg-white shadow-sm"></div>
          <div className="border border-gray-300 rounded-lg p-4 w-48 h-24 bg-white shadow-sm"></div>
        </div>
        
        {/* Subject Performance and Distributions Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Subject Performance Column */}
          <div>
            <h4 className="font-medium mb-3">Subject Performance</h4>
            <div className="border border-gray-300 rounded-lg p-3 h-57 bg-white shadow-sm"></div>
          </div>
          
          {/* Student Risk Distribution Column */}
          <div>
            <h4 className="font-medium mb-3">Student Risk Distribution</h4>
            <div className="border border-gray-300 rounded-lg p-3 h-57 bg-white shadow-sm"></div>
          </div>
          
          {/* Grade Distribution Column */}
          <div>
            <h4 className="font-medium mb-3">Grade Distribution</h4>
            <div className="space-y-3">
              <div className="border border-gray-300 rounded-lg p-3 h-12 bg-white shadow-sm"></div>
              <div className="border border-gray-300 rounded-lg p-3 h-12 bg-white shadow-sm"></div>
              <div className="border border-gray-300 rounded-lg p-3 h-12 bg-white shadow-sm"></div>
              <div className="border border-gray-300 rounded-lg p-3 h-12 bg-white shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}