import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = await prisma.kendaraan.findUnique({
    where: { slug },
  });

  if (!car) {
    return {
      title: "Mobil Tidak Ditemukan - Agung Toyota",
    };
  }

  return {
    title: `Spesifikasi dan Harga ${car.nama} Terbaru - Agung Toyota`,
    description: `Dapatkan informasi lengkap spesifikasi, fitur, warna, dan harga ${car.nama} terbaru. Kunjungi dealer Agung Toyota terdekat untuk test drive.`,
    keywords: `Harga ${car.nama}, Spesifikasi ${car.nama}, Kredit ${car.nama}, Promo ${car.nama}, Agung Toyota`,
  };
}

export default async function CarDetail({ params }: {
  params: Promise<{ slug: string }>; }) {
  const { slug } = await params;
  const car = await prisma.kendaraan.findUnique({
    where: { slug },
  });

  if (!car) {
    notFound();
  }

  // Parse colors and features JSON strings safely
  let warnaArr: string[] = [];
  let fiturArr: string[] = [];

  try {
    warnaArr = car.warna ? JSON.parse(car.warna) : [];
  } catch (e) {
    warnaArr = car.warna ? car.warna.split(",").map(s => s.trim()) : [];
  }

  try {
    fiturArr = car.fitur ? JSON.parse(car.fitur) : [];
  } catch (e) {
    fiturArr = car.fitur ? car.fitur.split(",").map(s => s.trim()) : [];
  }

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><Link href="/" className="hover:text-toyota-red">Beranda</Link></li>
            <li><span>/</span></li>
            <li><Link href="/mobil" className="hover:text-toyota-red">Mobil</Link></li>
            <li><span>/</span></li>
            <li className="text-gray-900 dark:text-white font-medium" aria-current="page">{car.nama}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Area */}
          <div className="animate-fade-in-up">
            <div className="relative h-80 md:h-[400px] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-xl border border-gray-100 dark:border-zinc-800">
              <Image 
                src={car.gambar} 
                alt={`${car.nama} - Agung Toyota`} 
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-toyota-black text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wide shadow-md">
                {car.tipe}
              </div>
            </div>
          </div>

          {/* Details Area */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
              {car.nama}
            </h1>
            <div className="text-3xl font-bold text-toyota-red mb-6">
              {car.harga}
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed whitespace-pre-wrap">
              {car.deskripsi}
            </p>

            {/* Colors */}
            {warnaArr.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-zinc-800 pb-2">
                  Pilihan Warna
                </h3>
                <div className="flex flex-wrap gap-2">
                  {warnaArr.map((color, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium border border-gray-200 dark:border-zinc-700">
                      {color}
                    </span> 
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {fiturArr.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-zinc-800 pb-2">
                  Fitur Utama
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fiturArr.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                      <svg className="h-6 w-6 text-toyota-red mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-auto pt-6">
              <Link 
                href={`https://wa.me/6281380053428?text=Halo%20Agung%20Toyota,%20saya%20tertarik%20dengan%20${encodeURIComponent(car.nama)}`} 
                target="_blank"
                className="block text-center px-6 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/20"
              >
                Chat WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
