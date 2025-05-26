type Props = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex justify-between items-center text-sm">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
