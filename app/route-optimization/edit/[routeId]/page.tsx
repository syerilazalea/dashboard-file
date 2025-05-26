'use client';

import { useEffect, useState } from 'react';

export default function EditPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const dummyData = [
    { id: 1, name: 'Rute A', location: 'Jakarta' },
    { id: 2, name: 'Rute B', location: 'Bandung' },
    { id: 3, name: 'Rute C', location: 'Surabaya' },
  ];

  const [formData, setFormData] = useState({ name: '', location: '' });

  useEffect(() => {
    const routeData = dummyData.find((r) => r.id === parseInt(id));
    if (routeData) {
      setFormData({ name: routeData.name, location: routeData.location });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Data ID ${id} berhasil diupdate:\nNama: ${formData.name}\nLokasi: ${formData.location}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Rute (ID: {id})</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama Rute</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Lokasi</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
