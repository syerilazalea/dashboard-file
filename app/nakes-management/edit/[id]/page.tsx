'use client'

import { useParams } from 'next/navigation'

export default function EditNakesPage() {
  const params = useParams()
  const id = params?.id

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Nakes</h1>
      <p className="text-gray-600">Editing Nakes with ID: {id}</p>
    </div>
  )
}
