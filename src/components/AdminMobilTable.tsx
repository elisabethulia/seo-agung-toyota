"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Car {
  id: number;
  nama: string;
  slug: string;
  harga: number;
  tipe: string;
  gambar: string;
}

interface AdminMobilTableProps {
  initialCars: Car[];
}

const formatRupiah = (value: string | number) => {
  if (!value) return "Rp 0";
  const cleanNumberString = value.toString().replace(/[^0-9]/g, "");
  
  // Jika setelah dibersihkan tidak ada angka tersisa, return Rp 0
  if (!cleanNumberString) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(cleanNumberString));
};

const getSafeImageSrc = (src: string | null | undefined) => {
  const fallbackImage = "/uploads/mobil-default.jpg";

  if (!src) return fallbackImage;

  console.log(src);

  if (src === "[object File]") return fallbackImage;

  if (src.includes("via.placeholder.com")) return fallbackImage;

  const isValidPath = src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://");

  return isValidPath ? src : fallbackImage;
};

export default function AdminMobilTable({ initialCars }: AdminMobilTableProps) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus mobil "${name}"?`)) {
      try {
        setDeletingId(id);
        const response = await fetch(`/api/admin/mobil/${id}`, {
          method: "DELETE",
        });
        
        let data = null;
        try {
          data = await response.json();
        } catch (err) {
          data = { message: "No response body" };
        }

        if (!response.ok) {
          alert(data.message || "Gagal menghapus mobil");
          return;
        }

        alert("Mobil berhasil dihapus");
        setCars(cars.filter((car) => car.id !== id));
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan sistem");
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Filter cars based on search query
  const filteredCars = cars.filter((car) =>
  car.nama.toLowerCase().includes(search.toLowerCase()) ||
  car.tipe.toLowerCase().includes(search.toLowerCase()) ||
  car.harga.toString().includes(search)
);

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cari mobil berdasarkan nama, tipe, atau harga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-toyota-red/20 focus:border-toyota-red transition-all shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Add Button */}
        <Link
          href="/admin/mobil/tambah"
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-toyota-red hover:bg-toyota-darkred text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-toyota-red/10 active:scale-95"
        >
          <span>➕</span>
          <span>Tambah Kendaraan Baru</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-55">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Gambar</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Mobil</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tipe</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Harga</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Slug URL</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCars.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">
                    {search ? "Tidak ada mobil yang cocok dengan pencarian" : "Belum ada mobil terdaftar"}
                  </td>
                </tr>
              ) : (
                filteredCars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-14 w-24 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                        <Image
                          src={getSafeImageSrc(car.gambar)}
                          alt={car.nama}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="96px"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{car.nama}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200/60">
                        {car.tipe}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-toyota-red">{formatRupiah(car.harga)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs font-mono">
                      /{car.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/mobil/edit/${car.id}`}
                          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200 transition-colors"
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(car.id, car.nama)}
                          disabled={deletingId === car.id}
                          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-650 text-xs font-bold border border-red-100 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          🗑️ {deletingId === car.id ? "Hapus..." : "Hapus"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
