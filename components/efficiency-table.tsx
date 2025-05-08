'use client'

import { ArrowUpDown } from "lucide-react"
import { useState } from "react"

const originalData = [
  { id: 1, name: "Dr. Gita", visits: 12, distance: "8.2 km", efficiency: "High" },
  { id: 2, name: "Dr. Budi", visits: 10, distance: "10.5 km", efficiency: "Medium" },
  { id: 3, name: "Dr. Dewi", visits: 9, distance: "12.1 km", efficiency: "Medium" },
  { id: 4, name: "Dr. Andi", visits: 8, distance: "9.8 km", efficiency: "High" },
  { id: 5, name: "Dr. Gita", visits: 12, distance: "8.2 km", efficiency: "High" },
  { id: 6, name: "Dr. Budi", visits: 10, distance: "10.5 km", efficiency: "Medium" },
  { id: 7, name: "Dr. Dewi", visits: 9, distance: "12.1 km", efficiency: "Medium" },
  { id: 8, name: "Dr. Andi", visits: 8, distance: "9.8 km", efficiency: "High" },
  { id: 9, name: "Dr. Gita", visits: 12, distance: "8.2 km", efficiency: "High" },
  { id: 10, name: "Dr. Budi", visits: 10, distance: "10.5 km", efficiency: "Medium" },
  { id: 11, name: "Dr. Dewi", visits: 9, distance: "12.1 km", efficiency: "Medium" },
  { id: 12, name: "Dr. Andi", visits: 8, distance: "9.8 km", efficiency: "High" },
]

const PAGE_SIZE = 5

export function EfficiencyTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [efficiencyFilter, setEfficiencyFilter] = useState("")
  const [page, setPage] = useState(1)

  const filteredData = originalData.filter((row) => {
    const matchName = row.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEff = efficiencyFilter ? row.efficiency === efficiencyFilter : true
    return matchName && matchEff
  })

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE)
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap justify-between gap-2">
        <input
          type="text"
          placeholder="Search Nakes..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setPage(1)
          }}
          className="border px-3 py-1 rounded text-sm w-full sm:w-1/2"
        />
        <select
          value={efficiencyFilter}
          onChange={(e) => {
            setEfficiencyFilter(e.target.value)
            setPage(1)
          }}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="">All Efficiency</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Medium">Low</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full mt-2">
        <table className="min-w-[600px] w-full text-sm">
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
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
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
                          : "bg-yellow-100 text-yellow-700"
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

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm">
        {/* Previous Button */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <span>
          Page {page} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}