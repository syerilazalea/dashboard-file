type Props = {
  selected: "efficiency" | "summary"
  onSelect: (type: "efficiency" | "summary") => void
}

export function TableSwitcher({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSelect("efficiency")}
        className={`px-4 py-2 rounded ${selected === "efficiency" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
      >
        Efficiency Table
      </button>
      <button
        onClick={() => onSelect("summary")}
        className={`px-4 py-2 rounded ${selected === "summary" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
      >
        Summary Table
      </button>
    </div>
  )
}
