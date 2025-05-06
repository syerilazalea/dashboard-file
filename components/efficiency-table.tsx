import { ArrowUpDown } from "lucide-react"

const data = [
  { id: 1, name: "Dr. Gita", visits: 12, distance: "8.2 km", efficiency: "High" },
  { id: 2, name: "Dr. Budi", visits: 10, distance: "10.5 km", efficiency: "Medium" },
  { id: 3, name: "Dr. Dewi", visits: 9, distance: "12.1 km", efficiency: "Medium" },
  { id: 4, name: "Dr. Andi", visits: 8, distance: "9.8 km", efficiency: "High" },
]

export function EfficiencyTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
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
          {data.map((row) => (
            <tr key={row.id} className="border-b last:border-0">
              <td className="py-3 text-gray-800">{row.id}</td>
              <td className="py-3 text-gray-800 font-medium">{row.name}</td>
              <td className="py-3 text-gray-800">{row.visits}</td>
              <td className="py-3 text-gray-800">{row.distance}</td>
              <td className="py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.efficiency === "High" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {row.efficiency}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
