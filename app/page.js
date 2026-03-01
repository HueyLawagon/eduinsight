// app/page.js
export default function Home() {
  return (
    <div className="min-h-screen bg-white p-8">
      
      {/* Performance Dashboard Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Performance Dashboard</h3>
        
           {/* Stats Cards Row (responsive: min-size preserved, cards can grow/shrink) */}
           <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '6rem', flex: '1 1 12rem'}}></div>
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '6rem', flex: '1 1 12rem'}}></div>
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '6rem', flex: '1 1 12rem'}}></div>
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex-shrink-0"
            style={{minWidth: '12rem', minHeight: '6rem', flex: '1 1 12rem'}}></div>
           </div>
        
        {/* Subject Performance and Student Risk (side-by-side on md+, stacked on small screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start justify-items-center">
          {/* Subject Performance Column */}
          <div className="w-full max-w-full">
            <h4 className="font-medium mb-3 text-center md:text-left">Subject Performance</h4>
            <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm w-full"
                 style={{minHeight: '14rem'}}></div>
          </div>
          
          {/* Student Risk Distribution Column */}
          <div className="w-full max-w-full">
            <h4 className="font-medium mb-3 text-center md:text-left">Student Risk Distribution</h4>
            <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm w-full"
                 style={{minHeight: '14rem', minWidth: '12rem'}}></div>
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