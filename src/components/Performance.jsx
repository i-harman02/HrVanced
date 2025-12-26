export default function Performance(){
    const data = [
        {employeeName: "Abhishek",
        projectName: "Web Developer",
        comments: "Client feedback incorporated into latest build",
        date:'12-Dec-2025',
        addedBy: "Project Manager"
        },
    ];
    return(
        <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
              {/* Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-md">
                <table className="min-w-[900px] w-full text-xs">
                  <thead className="border-b text-gray-500">
                    <tr>
                      <th className="text-left py-4 px-4">Employee Name</th>
                      <th className="text-left px-4">Project Name</th>
                      <th className="text-left px-4">Comments</th>
                      <th className="text-left px-4">Date</th>
                      <th className="text-left px-4">Added By</th>
                      <th className="text-left px-4">Actions</th>
                    </tr>
                  </thead>
        
                  <tbody>
                    {data.map((item, i) => (
                      <tr
                        key={i}
                        className="border-b last:border-b-0 text-gray-700"
                      >
                        <td className="py-4 px-4">{item.employeeName}</td>
                        <td className="px-4">{item.projectName}</td>
                        <td className="px-4">{item.comments}</td>
                        <td className="px-4">{item.date}</td>      
                        <td className="px-4">{item.addedBy}</td>       
                        <td className="px-4">
                          <button className="text-gray-400 hover:text-gray-600">
                            ✎
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        
              {/* Footer */}
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center px-2 pt-3 text-xs text-gray-500">
                <span>Showing 1 to 05 of 20 results</span>
                <div className="flex gap-2">
                  <button className="border rounded px-3 py-1 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="border rounded px-3 py-1 hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
    );
}