"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginClient() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login gagal");
        return;
      }

      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">

        <h1 className="text-2xl font-bold text-center mb-6">
          Login Admin
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 rounded-xl"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Belum punya akun?{" "}
          <Link href="/register" className="text-red-600">
            Daftar
          </Link>
        </p>

      </div>
    </div>
  );
}