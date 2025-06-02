"use client"

import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Navigation } from "lucide-react"

interface Location {
  from: string
  to: string
}

interface Appointment {
  id: string
  rank: string
  nakes: string
  visit: number
  patient: string
  date: string
  time: string
  location: Location
  distance: string
  status: string
}

export default function EfficiencyTable() {
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([])
  const [summaryData, setSummaryData] = useState<Appointment[]>([])

  const [search, setSearch] = useState("")
  const [nakesFilter, setNakesFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)
  const [activeTable, setActiveTable] = useState<"full" | "summary">("full")
  const rowsPerPage = 5
  const [loading, setLoading] = useState(false)


  // Fetch data from external API
  useEffect(() => {
    fetch("https://mocki.io/v1/b475c2e6-1f1f-48f1-aa92-7d54b0013ca8")
      .then((res) => res.json())
      .then((data: Appointment[]) => {
        setAppointmentsData(data)

        // Process summary
        const summaryMap = new Map<string, Appointment>()
        data.forEach((row) => {
          if (!summaryMap.has(row.nakes)) {
            summaryMap.set(row.nakes, {
              ...row,
              visit: 1,
              distance: parseFloat(row.distance).toString(),
              rank: "",
            })
          } else {
            const existing = summaryMap.get(row.nakes)!
            summaryMap.set(row.nakes, {
              ...existing,
              visit: existing.visit + 1,
              distance: (parseFloat(existing.distance) + parseFloat(row.distance)).toFixed(1),
            })
          }
        })

        const summaryArray = Array.from(summaryMap.values())
        summaryArray.sort((a, b) => parseFloat(b.distance) - parseFloat(a.distance))
        summaryArray.forEach((item, index) => {
          item.rank = `${index + 1}`
        })

        setSummaryData(summaryArray)
      })
      .catch((error) => console.error("Failed to fetch data:", error))
  }, [])

  // Reset page on filters change
  useEffect(() => {
    setPage(1)
  }, [search, nakesFilter, statusFilter, activeTable])

  // Filtered data
  const filteredData = useMemo(() => {
    return appointmentsData.filter((row) => {
      const matchSearch = row.nakes.toLowerCase().includes(search.toLowerCase())
      const matchNakes = nakesFilter ? row.nakes === nakesFilter : true
      const matchStatus = statusFilter ? row.status === statusFilter : true
      return matchSearch && matchNakes && matchStatus
    })
  }, [appointmentsData, search, nakesFilter, statusFilter])

  const currentData = activeTable === "full" ? filteredData : summaryData
  const totalPages = Math.ceil(currentData.length / rowsPerPage)
  const getPaginatedData = (data: Appointment[]) => {
  const start = (page - 1) * rowsPerPage
  const end = page * rowsPerPage
  return data.slice(start, end)
}

  const paginatedData = getPaginatedData(currentData)


  return (
    <div className="p-4 bg-white rounded-lg">
      {/* Tabs */}
      <div className="mb-4 border-b border-gray-300">
        <nav className="flex space-x-4" aria-label="Tabs">
          {["full", "summary"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-t-md ${
                activeTable === tab
                  ? "bg-white border border-b-0 border-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTable(tab as any)}
            >
              {tab === "full" ? "Full Table" : "Summary Table"}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Nakes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-1/4"
        />
        <div className="flex gap-2 w-full sm:w-1/4">
          <select
            value={nakesFilter}
            onChange={(e) => setNakesFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-1/2"
          >
            <option value="">All Nakes</option>
            {[...new Set(appointmentsData.map((a) => a.nakes))].map((nakes) => (
              <option key={nakes} value={nakes}>{nakes}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-1/2"
          >
            <option value="">All Status</option>
            {["Completed", "In Progress", "Scheduled"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="p-4 border rounded-lg shadow-sm bg-white">
        {activeTable === "full" ? (
          <FullTable data={paginatedData} />
        ) : (
          <SummaryTable data={paginatedData} />
        )}
        {paginatedData.length === 0 && (
          <div className="text-center py-4 text-gray-500">No data found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Prev
        </Button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

// Component: Full Table
function FullTable({ data }: { data: Appointment[] }) {
  return (
    <table className="w-full table-auto text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2 text-gray-600 font-medium">ID</th>
          <th className="py-2 text-gray-600 font-medium">Nakes</th>
          <th className="py-2 text-gray-600 font-medium">Patient</th>
          <th className="py-2 text-gray-600 font-medium">Date & Time</th>
          <th className="py-2 text-gray-600 font-medium">Location</th>
          <th className="py-2 text-gray-600 font-medium">Distance</th>
          <th className="py-2 text-gray-600 font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b last:border-0">
            <td className="py-3 font-semibold">{row.id}</td>
            <td className="py-3">{row.nakes}</td>
            <td className="py-3">{row.patient}</td>
            <td className="py-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3 text-black" />
                  <span>{row.date}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span>{row.time}</span>
                </div>
              </div>
            </td>
            <td className="py-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Navigation className="h-3 w-3" />
                  <span>{row.location.from}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3 text-red-500" />
                  <span>{row.location.to}</span>
                </div>
              </div>
            </td>
            <td className="py-3">{row.distance} km</td>
            <td className="py-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  row.status === "Completed"
                    ? "bg-emerald-100 text-emerald-700"
                    : row.status === "Scheduled"
                    ? "bg-yellow-100 text-yellow-700"
                    : row.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Component: Summary Table
function SummaryTable({ data }: { data: Appointment[] }) {
  return (
    <table className="w-full table-auto text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2 text-gray-600 font-medium">Rank</th>
          <th className="py-2 text-gray-600 font-medium">Nakes</th>
          <th className="py-2 text-gray-600 font-medium">Visit</th>
          <th className="py-2 text-gray-600 font-medium">Distance</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.nakes} className="border-b last:border-0">
            <td className="py-3 font-semibold">{row.rank}</td>
            <td className="py-3">{row.nakes}</td>
            <td className="py-3">{row.visit}</td>
            <td className="py-3">{row.distance} km</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
