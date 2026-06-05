"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahMobilPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    slug: "",
    harga: "",
    tipe: "",
    deskripsi: "",
  });

  const [gambarFile, setGambarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); 

  const [warnaInput, setWarnaInput] = useState("");
  const [warnaList, setWarnaList] = useState<string[]>(["Putih", "Hitam", "Silver"]);
  
  const [fiturInput, setFiturInput] = useState("");
  const [fiturList, setFiturList] = useState<string[]>([]);

  const [autoSlug, setAutoSlug] = useState(true);

  // Membersihkan memori URL blob ketika komponen unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Auto-generate slug dari nama
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    
    let generatedSlug = formData.slug;
    if (autoSlug) {
      generatedSlug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }
    
    setFormData((prev) => ({
      ...prev,
      nama: nameValue,
      slug: generatedSlug
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoSlug(false);
    setFormData({
      ...formData,
      slug: e.target.value,
    });
  };

  // Tambah item ke list dinamis
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
    
    // Validasi data sebelum dikirim
    if (
      !formData.nama.trim() ||
      !formData.slug.trim() ||
      !formData.harga.trim() ||
      !formData.tipe.trim() ||
      !formData.deskripsi.trim() ||
      !gambarFile
    ) {
      alert("Semua field utama wajib diisi!");
      return;
    }

    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("nama", formData.nama.trim());
      payload.append("slug", formData.slug.trim());
      payload.append("harga", formData.harga.trim());
      payload.append("tipe", formData.tipe.trim());
      payload.append("deskripsi", formData.deskripsi.trim());

      if (gambarFile) {
        payload.append("gambar", gambarFile);
      }

      payload.append("warna", JSON.stringify(warnaList));
      payload.append("fitur", JSON.stringify(fiturList));

      const response = await fetch("/api/admin/mobil", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || JSON.stringify(data) || "Gagal menambahkan mobil");
        return;
      }

      alert("Mobil berhasil ditambahkan!");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem");
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
            <Link href="/admin" className="hover:text-toyota-red">Dashboard</Link> &gt; <span>Tambah Mobil</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900">Tambah Kendaraan</h1>
        </div>
        <Link
          href="/admin"
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold border border-gray-200 transition-colors self-start shadow-sm"
        >
          ⬅️ Kembali ke Dashboard
        </Link>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Main Info */}
        <div className="lg:col-span-2 space-y-6 bg-white border border-gray-200/80 p-8 rounded-3xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Informasi Umum</h2>

          <div className="space-y-2">
            <label htmlFor="nama" className="text-sm font-bold text-gray-700 block">
              Nama Mobil
            </label>
            <input
              id="nama"
              type="text"
              name="nama" // ✅ FIX: Atribut name sekarang sudah terpasang aman
              required
              value={formData.nama}
              onChange={handleNameChange}
              placeholder="Contoh: Toyota Avanza"
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-toyota-red/20 focus:border-toyota-red transition-all"
            />
          </div>

          {/* URL Slug */}
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-bold text-gray-700 block flex items-center justify-between">
              <span>URL Slug (Unique Slug)</span>
              <button
                type="button"
                onClick={() => setAutoSlug(true)}
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
            
            <div className="space-y-2">
              <label htmlFor="harga" className="text-sm font-bold text-gray-700 block">Harga Jual (Mulai Dari)</label>
              <input
                id="harga"
                type="text"
                name="harga"
                required
                value={formData.harga}
                onChange={handleInputChange}
                placeholder="Contoh: Rp 450.000.000"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-toyota-red/20 focus:border-toyota-red transition-all"
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

        {/* Right 1 Column: Image & Specs Lists */}
        <div className="space-y-6">
          
          {/* Section: Gambar */}
          <div className="bg-white border border-gray-200/80 p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Foto / Gambar</h2>
            
            <label htmlFor="gambar" className="text-sm font-bold text-gray-700 block">Upload Gambar Mobil</label>
            
            <input
              id="gambar"
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (preview) URL.revokeObjectURL(preview); 
                  setGambarFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
            />
            
            {preview && (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          {/* Section: Spesifikasi Tambahan */}
          <div className="bg-white border border-gray-200/80 p-6 rounded-3xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Spesifikasi Detail</h2>

            {/* Pilihan Warna */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 block">Pilihan Warna</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tambah warna (cth: Merah)"
                  value={warnaInput}
                  onChange={(e) => setWarnaInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addWarna())}
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-1 focus:ring-toyota-red/40"
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
                {warnaList.length === 0 ? (
                  <span className="text-xs text-gray-400">Belum ada warna diinput</span>
                ) : (
                  warnaList.map((w, index) => (
                    <span
                      key={w}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200/60"
                    >
                      <span>{w}</span>
                      <button
                        type="button"
                        onClick={() => removeWarna(index)}
                        className="text-gray-400 hover:text-red-600 font-bold ml-0.5"
                      >
                        ✕
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Fitur Unggulan */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 block">Fitur Unggulan</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tambah fitur (cth: Engine Start)"
                  value={fiturInput}
                  onChange={(e) => setFiturInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFitur())}
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-1 focus:ring-toyota-red/40"
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
                {fiturList.length === 0 ? (
                  <span className="text-xs text-gray-400">Belum ada fitur diinput</span>
                ) : (
                  fiturList.map((f, index) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200/60"
                    >
                      <span className="truncate max-w-[120px]">{f}</span>
                      <button
                        type="button"
                        onClick={() => removeFitur(index)}
                        className="text-gray-400 hover:text-red-600 font-bold ml-0.5"
                      >
                        ✕
                      </button>
                    </span>
                  ))
                )}
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
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>💾 Simpan Kendaraan</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}