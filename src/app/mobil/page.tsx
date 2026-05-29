import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { cars } from '@/data/cars';

export const metadata: Metadata = {
  title: 'Daftar Harga Mobil Toyota Terbaru - Agung Toyota',
  description: 'Lihat daftar lengkap mobil Toyota terbaru beserta spesifikasi dan harganya di Agung Toyota. Temukan mobil yang tepat untuk Anda.',
  keywords: 'Daftar Mobil Toyota, Harga Mobil Toyota, Beli Mobil Toyota',
};

export default function MobilList() {
  return (
    <div className="py-16 bg-gray-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Koleksi <span className="text-toyota-red">Toyota</span> Terbaru
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Temukan berbagai pilihan mobil Toyota yang dirancang untuk memenuhi setiap kebutuhan perjalanan Anda. Dari MPV keluarga hingga SUV tangguh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <div 
              key={car.id} 
              className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-zinc-800"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 w-full bg-zinc-200 dark:bg-zinc-800">
                {/* Fallback pattern/color is applied via bg class. Image component used for actual image rendering */}
                <Image 
                  src={car.image} 
                  alt={`Gambar mobil ${car.name}`} 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-toyota-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {car.type}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{car.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {car.description}
                </p>
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Mulai Dari</p>
                    <p className="text-lg font-bold text-toyota-red">{car.price}</p>
                  </div>
                  <Link 
                    href={`/mobil/${car.slug}`}
                    className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold rounded-full hover:bg-toyota-red dark:hover:bg-toyota-red dark:hover:text-white transition-colors"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
