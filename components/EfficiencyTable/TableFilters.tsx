type Props = {
  page: number
  searchTerm: Record<number, string>
  efficiencyFilter: Record<number, string>
  onSearchChange: (value: string) => void
  onFilterChange: (value: string) => void
}

export function TableFilters({
  page,
  searchTerm,
  efficiencyFilter,
  onSearchChange,
  onFilterChange,
}: Props) {
  return (
    <div className="flex flex-wrap justify-between gap-2">
      <input
        type="text"
        placeholder="Search Nakes..."
        value={searchTerm[page] || ""}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border px-3 py-2 rounded-md text-sm w-64 sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={efficiencyFilter[page] || ""}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-3 py-2 text-sm text-center border rounded-md focus:outline-none focus:ring-2 focus:border-gray-600"
      >
        <option value="">All Efficiency</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  )
}
