"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
  console.log("HANDLE REGISTER JALAN");

  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Konfirmasi password tidak sesuai!");
    return;
  }

  try {
    setIsLoading(true);

    console.log("KIRIM KE API");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
      }),
    });

    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log("DATA:", data);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Registrasi berhasil!");
    router.push("/login");
  } catch (error) {
    console.error("ERROR:", error);
    alert("Terjadi kesalahan");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 animate-fade-in-up">
        
        {/* Header */}
        <div>
            <div className="flex justify-center">
                <span className="text-4xl font-black text-toyota-red">
                    AGUNG TOYOTA
                    </span>
                    </div>
                    
                <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Daftar Akun Baru
                </h2>
            </div>

        {/* Content */}
        <div>

          <form onSubmit={handleRegister} className="space-y-5" method="POST">
            <div>
              <label
                htmlFor="nama"
                className="block mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Nama Lengkap
              </label>

              <input
                id="nama"
                type="text"
                name="nama"
                required
                value={formData.nama}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-toyota-red focus:border-toyota-red outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-toyota-red focus:border-toyota-red outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-toyota-red focus:border-toyota-red outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Konfirmasi Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-toyota-red focus:border-toyota-red outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-toyota-red hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Memproses..." : "Daftar Sekarang"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Sudah memiliki akun?
            </p>

            <Link href="/login"
              className="inline-block mt-2 text-toyota-red font-semibold hover:text-red-700 transition"
            >
              Masuk di sini
            </Link>
          </div>
             </div>
    </div>
  </div>
);
}