"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Token reset tidak valid atau hilang!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Konfirmasi sandi baru tidak sesuai!");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Gagal mereset kata sandi");
        return;
      }

      setIsSuccess(true);
      alert("Kata sandi berhasil diubah!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
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
            Atur Ulang Kata Sandi
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {!token ? "Token reset hilang atau tidak valid" : "Masukkan kata sandi baru untuk akun admin Anda."}
          </p>
        </div>

        {/* Content */}
        {!token ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-xl bg-red-55/10 text-red-650 border border-red-100 text-sm font-semibold">
              ❌ Token reset tidak ditemukan di URL. Harap klik tautan reset yang valid.
            </div>
            <div className="pt-2">
              <Link
                href="/forgot-password"
                className="text-sm font-bold text-toyota-red hover:text-red-700 transition"
              >
                Minta Tautan Reset Baru
              </Link>
            </div>
          </div>
        ) : isSuccess ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-semibold">
              🎉 Kata sandi berhasil diperbarui! Mengarahkan Anda ke halaman login...
            </div>
            <div className="pt-2">
              <Link
                href="/login"
                className="text-sm font-bold text-toyota-red hover:text-red-700 transition"
              >
                Masuk Sekarang
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" method="POST">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Kata Sandi Baru
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi baru"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-toyota-red focus:border-toyota-red outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Ulangi Kata Sandi Baru
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi baru"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-toyota-red focus:border-toyota-red outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-toyota-red hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-955 text-zinc-900 dark:text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-8 w-8 border-4 border-toyota-red border-t-transparent rounded-full"></div>
          <span className="text-sm font-semibold">Memuat halaman...</span>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
