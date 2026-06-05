"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [debugLink, setDebugLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setDebugLink("");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Gagal memproses permintaan");
        return;
      }

      setMessage(data.message);
      if (data.debugLink) {
        setDebugLink(data.debugLink);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem");
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
            <span className="text-4xl font-black text-toyota-red">AGUNG TOYOTA</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Lupa Kata Sandi
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Masukkan email terdaftar untuk mengatur ulang kata sandi akun admin Anda.
          </p>
        </div>

        {/* Content */}
        {message ? (
          <div className="space-y-6 text-center">
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-semibold">
              ✅ {message}
            </div>
            
            {/* Dev Mode Assistant */}
            {debugLink && (
              <div className="p-5 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 space-y-3 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">👨‍💻 Dev Mode Assistant</span>
                <p className="text-xs text-amber-800">
                  Karena Anda sedang menjalankan aplikasi di lingkungan development lokal, Anda dapat mengeklik tombol di bawah ini untuk langsung menuju ke halaman ganti sandi:
                </p>
                <Link
                  href={debugLink}
                  className="block text-center w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-amber-500/20"
                >
                  Buka Tautan Reset Sandi
                </Link>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/login"
                className="text-sm font-semibold text-toyota-red hover:text-red-700 transition"
              >
                ⬅️ Kembali ke Halaman Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Alamat Email Admin
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email terdaftar"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-toyota-red focus:border-toyota-red outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-toyota-red hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Mengirim..." : "Kirim Tautan Reset"}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-sm font-semibold text-zinc-500 hover:text-toyota-red transition"
              >
                Kembali ke Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
