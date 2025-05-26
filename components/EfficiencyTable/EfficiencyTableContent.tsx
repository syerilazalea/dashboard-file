import { ArrowUpDown } from "lucide-react"

export function EfficiencyTableContent({ data }: { data: any[] }) {
  return (
    <div className="overflow-x-auto w-full mt-2 p-2">
      <table className="min-w-[700px] w-full text-sm">
        <thead className="sticky top-0 bg-white border-b z-10">
          <tr>
            <th className="text-left font-medium text-gray-500 pb-2">Rank</th>
            <th className="text-left font-medium text-gray-500 pb-2">Nakes</th>
            <th className="text-left font-medium text-gray-500 pb-2">
              <div className="flex items-center gap-1">
                <span>Visits</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="text-left font-medium text-gray-500 pb-2">
              <div className="flex items-center gap-1">
                <span>Avg. Distance</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="text-left font-medium text-gray-500 pb-2">Efficiency</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="border-b last:border-0">
                <td className="py-3 text-gray-800">{row.id}</td>
                <td className="py-3 text-gray-800 font-medium">{row.name}</td>
                <td className="py-3 text-gray-800">{row.visits}</td>
                <td className="py-3 text-gray-800">{row.distance}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.efficiency === "High"
                        ? "bg-emerald-100 text-emerald-700"
                        : row.efficiency === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.efficiency}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No matching data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
