"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Car {
  id: number;
  nama: string;
  slug: string;
  harga: number;
  tipe: string;
  deskripsi: string;
  gambar: string;
  warna: string[];
  fitur: string[];
}

interface EditMobilFormProps {
  initialCar: Car;
}

// ==========================================
// HELPER FUNCTIONS FOR RUPIAH FORMATTING
// ==========================================
const formatRupiah = (value: string) => {
  if (!value) return "Rp 0";
  // Hapus semua karakter selain angka
  const numberString = value.replace(/[^0-9]/g, "");
  if (!numberString) return "Rp 0";
  // Ubah ke format ribuan dengan titik
  const formatted = new Intl.NumberFormat("id-ID").format(Number(numberString));
  return `Rp ${formatted}`;
};

const cleanRupiahToNumber = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

export default function EditMobilForm({ initialCar }: EditMobilFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // State untuk data utama form
  const [formData, setFormData] = useState({
    nama: initialCar.nama,
    slug: initialCar.slug,
    harga: cleanRupiahToNumber(initialCar.harga.toString()), // Pastikan menyimpan angka murni saja
    tipe: initialCar.tipe,
    deskripsi: initialCar.deskripsi,
    gambar: initialCar.gambar,
  });

  // State khusus kontrol visual tampilan format Rupiah
  const [hargaDisplay, setHargaDisplay] = useState(formatRupiah(initialCar.harga.toString()));

  const [warnaInput, setWarnaInput] = useState("");
  const [warnaList, setWarnaList] = useState<string[]>(initialCar.warna);
  
  const [fiturInput, setFiturInput] = useState("");
  const [fiturList, setFiturList] = useState<string[]>(initialCar.fitur);

  const [autoSlug, setAutoSlug] = useState(false); 

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    const updatedData = { ...formData, nama: nameValue };
    
    if (autoSlug) {
      const generatedSlug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      updatedData.slug = generatedSlug;
    }
    
    setFormData(updatedData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler Khusus Mengubah Input Harga ke Format Rupiah
  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputRaw = e.target.value;
    
    // 1. Update tampilan visual (Rp 450.000.000)
    setHargaDisplay(formatRupiah(inputRaw));

    // 2. Update nilai angka murni ke dalam state form utama ("450000000")
    setFormData({
      ...formData,
      harga: cleanRupiahToNumber(inputRaw),
    });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoSlug(false);
    setFormData({
      ...formData,
      slug: e.target.value,
    });
  };

  // List management
  const addWarna = () => {
    if (warnaInput.trim() && !warnaList.includes(warnaInput.trim())) {
      setWarnaList([...warnaList, warnaInput.trim()]);
      setWarnaInput("");
    }
  };

  const removeWarna = (index: number) => {
    setWarnaList(warnaList.filter((_, i) => i !== index));
  };

  const addFitur = () => {
    if (fiturInput.trim() && !fiturList.includes(fiturInput.trim())) {
      setFiturList([...fiturList, fiturInput.trim()]);
      setFiturInput("");
    }
  };

  const removeFitur = (index: number) => {
    setFiturList(fiturList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("nama", formData.nama.trim());
      payload.append("slug", formData.slug.trim());
      
      // Mengirimkan harga murni (angka bersih) yang diambil dari state form utama
      payload.append("harga", formData.harga.trim()); 
      
      payload.append("tipe", formData.tipe.trim());
      payload.append("deskripsi", formData.deskripsi.trim());
      payload.append("gambar", formData.gambar.trim());

      payload.append("warna", JSON.stringify(warnaList));
      payload.append("fitur", JSON.stringify(fiturList));

      const response = await fetch(`/api/admin/mobil/${initialCar.id}`, {
        method: "PUT",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Gagal memperbarui data mobil");
        return;
      }

      alert("Perubahan data mobil berhasil disimpan!");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem internal pada form edit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/admin" className="hover:text-toyota-red">Dashboard</Link> &gt; <span>Edit Mobil</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900">Edit Kendaraan</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">ID Kendaraan: #{initialCar.id}</p>
        </div>
        <Link
          href="/admin"
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold border border-gray-200 transition-colors self-start shadow-sm"
        >
          ⬅️ Kembali ke Dashboard
        </Link>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6 bg-white border border-gray-200/80 p-8 rounded-3xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Informasi Umum</h2>

          {/* Nama Mobil */}
          <div className="space-y-2">
            <label htmlFor="nama" className="text-sm font-bold text-gray-700 block">Nama Mobil</label>
            <input
              id="nama"
              type="text"
              name="nama"
              required
              value={formData.nama}
              onChange={handleNameChange}
              placeholder="Contoh: Toyota Corolla Altis"
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-toyota-red/20 focus:border-toyota-red transition-all"
            />
          </div>

          {/* URL Slug */}
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-bold text-gray-700 block flex items-center justify-between">
              <span>URL Slug (Unique Slug)</span>
              <button
                type="button"
                onClick={() => setAutoSlug(!autoSlug)}
                className={`text-xs ${autoSlug ? "text-toyota-red font-bold" : "text-gray-400 hover:text-gray-600"}`}
              >
                🔄 Auto-Generate {autoSlug ? "Aktif" : "Nonaktif"}
              </button>
            </label>
            <input
              id="slug"
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleSlugChange}
              placeholder="Contoh: toyota-corolla-altis"
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-toyota-red/20 focus:border-toyota-red transition-all font-mono text-sm"
            />
          </div>

          {/* Tipe & Harga Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="tipe" className="text-sm font-bold text-gray-700 block">Tipe Kendaraan</label>
              <input
                id="tipe"
                type="text"
                name="tipe"
                required
                value={formData.tipe}
                onChange={handleInputChange}
                placeholder="Contoh: Sedan, SUV, MPV"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-toyota-red/20 focus:border-toyota-red transition-all"
              />
            </div>
            
            {/* Input Harga yang Diperbarui dengan Format Rupiah */}
            <div className="space-y-2">
              <label htmlFor="harga" className="text-sm font-bold text-gray-700 block">Harga Jual (Mulai Dari)</label>
              <input
                id="harga"
                type="text" // Diubah ke text agar bisa menampung karakter string 'Rp' dan titik '.'
                name="harga"
                required
                value={hargaDisplay} // Menggunakan visual state hargaDisplay
                onChange={handleHargaChange} // Menggunakan handler khusus rupiah
                placeholder="Contoh: Rp 450.000.000"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-toyota-red/20 focus:border-toyota-red transition-all font-semibold"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <label htmlFor="deskripsi" className="text-sm font-bold text-gray-700 block">Deskripsi & Keunggulan</label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              required
              rows={6}
              value={formData.deskripsi}
              onChange={handleInputChange}
              placeholder="Tuliskan spesifikasi lengkap, keunggulan, atau ringkasan performa mobil..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-toyota-red/20 focus:border-toyota-red transition-all resize-y"
            ></textarea>
          </div>
        </div>

        {/* Sidebar specs */}
        <div className="space-y-6">
          
          {/* Foto Gambar */}
          <div className="bg-white border border-gray-200/80 p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Foto / Gambar</h2>
            
            <div className="space-y-2">
              <label htmlFor="gambar" className="text-xs font-bold text-gray-500 block">URL Gambar Mobil</label>
              <input
                id="gambar"
                type="text"
                name="gambar"
                required
                value={formData.gambar}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-toyota-red/20 focus:border-toyota-red transition-all text-xs font-mono"
              />
            </div>

            {formData.gambar && (
              <div className="relative h-36 w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.gambar}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Warna & Fitur */}
          <div className="bg-white border border-gray-200/80 p-6 rounded-3xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Spesifikasi Detail</h2>

            {/* Warna */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 block">Pilihan Warna</label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tambah warna"
                  value={warnaInput}
                  onChange={(e) => setWarnaInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addWarna())}
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-1 focus:ring-toyota-red/45"
                />
                <button
                  type="button"
                  onClick={addWarna}
                  className="px-3.5 py-2 text-xs font-bold rounded-lg bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  Tambah
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {warnaList.map((w, index) => (
                  <span
                    key={w}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200/60"
                  >
                    <span>{w}</span>
                    <button
                      type="button"
                      onClick={() => removeWarna(index)}
                      className="text-gray-400 hover:text-red-650 font-bold ml-0.5"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Fitur */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 block">Fitur Unggulan</label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tambah fitur"
                  value={fiturInput}
                  onChange={(e) => setFiturInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFitur())}
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-1 focus:ring-toyota-red/45"
                />
                <button
                  type="button"
                  onClick={addFitur}
                  className="px-3.5 py-2 text-xs font-bold rounded-lg bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  Tambah
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {fiturList.map((f, index) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200/60"
                  >
                    <span className="truncate max-w-[120px]">{f}</span>
                    <button
                      type="button"
                      onClick={() => removeFitur(index)}
                      className="text-gray-400 hover:text-red-655 font-bold ml-0.5"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-3xl bg-toyota-red hover:bg-toyota-darkred text-white font-extrabold text-sm transition-all shadow-lg hover:shadow-toyota-red/10 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Menyimpan Perubahan...</span>
              </>
            ) : (
              <span>💾 Simpan Perubahan</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}