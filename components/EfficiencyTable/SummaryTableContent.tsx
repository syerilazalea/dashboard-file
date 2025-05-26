export function SummaryTableContent({ data }: { data: any[] }) {
  return (
    <div className="overflow-x-auto w-full mt-2 p-2">
      <table className="min-w-[700px] w-full text-sm">
        <thead className="sticky top-0 bg-white border-b z-10">
          <tr>
            <th className="text-left font-medium text-gray-500 pb-2">ID</th>
            <th className="text-left font-medium text-gray-500 pb-2">Location</th>
            <th className="text-left font-medium text-gray-500 pb-2">Date</th>
            <th className="text-left font-medium text-gray-500 pb-2">Patient</th>
            <th className="text-left font-medium text-gray-500 pb-2">Distance</th>
            <th className="text-left font-medium text-gray-500 pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="border-b last:border-0">
                <td className="py-3 text-gray-800">{row.id}</td>
                <td className="py-3 text-gray-800">{row.location}</td>
                <td className="py-3 text-gray-800">{row.date}</td>
                <td className="py-3 text-gray-800">{row.patient}</td>
                <td className="py-3 text-gray-800">{row.distance}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : row.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No matching data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
