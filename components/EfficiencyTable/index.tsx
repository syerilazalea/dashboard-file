"use client"

import { useState } from "react"
import { TableSwitcher } from "./TableSwitcher"
import { TableFilters } from "./TableFilters"
import { EfficiencyTableContent } from "./EfficiencyTableContent"
import { SummaryTableContent } from "./SummaryTableContent"
import { PaginationControls } from "./PaginationControls"

const pageSize = 5

const sampleEfficiencyData = [
  { id: 1, name: "Nakes A", visits: 10, distance: "2.1 km", efficiency: "High" },
  { id: 2, name: "Nakes B", visits: 8, distance: "3.4 km", efficiency: "Medium" },
  { id: 3, name: "Nakes C", visits: 12, distance: "1.5 km", efficiency: "High" },
  { id: 4, name: "Nakes D", visits: 5, distance: "5.2 km", efficiency: "Low" },
  { id: 5, name: "Nakes E", visits: 7, distance: "3.9 km", efficiency: "Medium" },
  { id: 6, name: "Nakes F", visits: 9, distance: "2.3 km", efficiency: "High" },
  { id: 7, name: "Nakes G", visits: 6, distance: "4.0 km", efficiency: "Low" },
]

const sampleSummaryData = [
  { id: 1, location: "Location A", date: "2024-05-01", patient: "Patient A", distance: "2.1 km", status: "Completed" },
  { id: 2, location: "Location B", date: "2024-05-02", patient: "Patient B", distance: "3.4 km", status: "Pending" },
  { id: 3, location: "Location C", date: "2024-05-03", patient: "Patient C", distance: "1.5 km", status: "Completed" },
  { id: 4, location: "Location D", date: "2024-05-04", patient: "Patient D", distance: "5.2 km", status: "Pending" },
  { id: 5, location: "Location E", date: "2024-05-05", patient: "Patient E", distance: "3.9 km", status: "Completed" },
  { id: 6, location: "Location F", date: "2024-05-06", patient: "Patient F", distance: "2.3 km", status: "Completed" },
  { id: 7, location: "Location G", date: "2024-05-07", patient: "Patient G", distance: "4.0 km", status: "Pending" },
]

export default function EfficiencyTable() {
  const [selectedTable, setSelectedTable] = useState<"efficiency" | "summary">("efficiency")
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState<Record<number, string>>({})
  const [efficiencyFilter, setEfficiencyFilter] = useState<Record<number, string>>({})

  const handleSearchChange = (value: string) => {
    setSearchTerm({ ...searchTerm, [page]: value })
  }

  const handleEfficiencyFilterChange = (value: string) => {
    setEfficiencyFilter({ ...efficiencyFilter, [page]: value })
  }

  const filterData = () => {
    let data = selectedTable === "efficiency" ? sampleEfficiencyData : sampleSummaryData
    const keyword = searchTerm[page]?.toLowerCase() || ""
    if (keyword) {
      data = data.filter((item) => {
        const name = selectedTable === "efficiency" ? item.name : item.patient
        return name.toLowerCase().includes(keyword)
      })
    }

    if (selectedTable === "efficiency" && efficiencyFilter[page]) {
      data = data.filter((item) => item.efficiency === efficiencyFilter[page])
    }

    return data
  }

  const paginatedData = () => {
    const filtered = filterData()
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }

  const totalPages = Math.ceil(filterData().length / pageSize)

  return (
    <div className="space-y-4">
      <TableSwitcher selected={selectedTable} onSelect={setSelectedTable} />

      <TableFilters
        page={page}
        searchTerm={searchTerm}
        efficiencyFilter={efficiencyFilter}
        onSearchChange={handleSearchChange}
        onFilterChange={handleEfficiencyFilterChange}
      />

      {selectedTable === "efficiency" ? (
        <EfficiencyTableContent data={paginatedData()} />
      ) : (
        <SummaryTableContent data={paginatedData()} />
      )}

      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
