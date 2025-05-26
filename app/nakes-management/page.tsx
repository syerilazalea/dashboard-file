'use client'

import Link from 'next/link'

export default function NakesManagementPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nakes Management</h1>
      <p className="text-gray-600 mb-6">
        loremipsum
      </p>

      {/* Tombol untuk navigasi ke halaman edit */}
      <Link href="/nakes-management/edit/10">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit Nakes ID 10
        </button>
      </Link>
    </div>
  )
}


