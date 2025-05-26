import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query; // <- ambil id dari URL

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Contoh: fetch data berdasarkan ID
      fetch(`/api/appointments/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [id]);

  if (!id) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Appointment {id}</h1>
      {/* Tampilkan data di sini atau form edit */}
      {data ? (
        <div>
          <p><strong>Nakes:</strong> {data.nakes}</p>
          <p><strong>Patient:</strong> {data.patient}</p>
          {/* tambahkan form di sini */}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
