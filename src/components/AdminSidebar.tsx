"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface AdminSidebarProps {
  user: {
    nama: string;
    email: string;
  };
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
      try {
        const res = await fetch("/api/logout", {
          method: "POST",
        });
        if (res.ok) {
          router.push("/login");
          router.refresh();
        } else {
          alert("Gagal logout");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat logout");
      }
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Tambah Kendaraan", href: "/admin/mobil/tambah", icon: "➕" },
    { name: "Lihat Landing Page", href: "/", icon: "🌐" },
  ];

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="md:hidden flex items-center justify-between bg-white text-gray-900 px-4 py-3 border-b border-gray-200 sticky top-0 z-50">
        <span className="text-lg font-black text-toyota-red">AGUNG TOYOTA</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-900 hover:text-toyota-red focus:outline-none p-2 rounded"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <span className="text-xl font-bold">✕</span>
          ) : (
            <span className="text-xl font-bold">☰</span>
          )}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-45"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white text-gray-800 border-r border-gray-250 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 flex flex-col gap-1">
          <span className="text-2xl font-black tracking-wider text-toyota-red">
            AGUNG TOYOTA
          </span>
          <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Admin Panel
          </span>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-toyota-red/10 border border-toyota-red/20 flex items-center justify-center text-lg font-bold text-toyota-red">
              {user.nama.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-gray-900 truncate">{user.nama}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-grow p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-toyota-red text-white shadow-lg shadow-toyota-red/10 scale-[1.02]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 border border-transparent transition-all cursor-pointer"
          >
            <span className="text-base">🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
