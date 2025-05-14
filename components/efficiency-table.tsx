'use client'

import { ArrowUpDown } from "lucide-react"
import { useState, useEffect } from "react"

const PAGE_SIZE = 5

export function EfficiencyTable() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState({})
  const [efficiencyFilter, setEfficiencyFilter] = useState({})
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch("/nakes-data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setLoading(false)
      })
  }, [])

  const currentSearch = searchTerm[page] || ""
  const currentFilter = efficiencyFilter[page] || ""

  const handleSearchChange = (value) => {
    setSearchTerm(prev => ({ ...prev, [page]: value }))
  }

  const handleFilterChange = (value) => {
    setEfficiencyFilter(prev => ({ ...prev, [page]: value }))
  }

  const filteredData = data.filter((row) => {
    const matchName = row.name.toLowerCase().includes(currentSearch.toLowerCase())
    const matchEff = currentFilter ? row.efficiency === currentFilter : true
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
          value={searchTerm[page] || ""}
          onChange={(e) => {
            handleSearchChange(e.target.value)
          }}
          className="border px-3 py-1 rounded text-sm w-full sm:w-1/2"
        />
        <select
          value={efficiencyFilter[page] || ""}
          onChange={(e) => {
            handleFilterChange(e.target.value)
          }}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="">All Efficiency</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
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

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm">
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
