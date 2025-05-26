'use client';

import { useRouter } from 'next/navigation';

const dummyData = [
  { id: 1, name: 'Rute A', location: 'Jakarta' },
  { id: 2, name: 'Rute B', location: 'Bandung' },
  { id: 3, name: 'Rute C', location: 'Surabaya' },
];

export default function RouteOptimizationPage() {
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/route-optimization/edit/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Halaman Route Optimization</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Nama Rute</th>
            <th className="px-4 py-2 border-b">Lokasi</th>
            <th className="px-4 py-2 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((route) => (
            <tr key={route.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{route.id}</td>
              <td className="px-4 py-2 border-b">{route.name}</td>
              <td className="px-4 py-2 border-b">{route.location}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleEdit(route.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
