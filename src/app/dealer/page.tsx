import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Informasi Dealer Agung Toyota - Lokasi & Kontak',
  description: 'Temukan lokasi dealer resmi Agung Toyota terdekat, jam operasional, dan nomor kontak yang bisa dihubungi. Kami siap melayani kebutuhan kendaraan Anda.',
  keywords: 'Dealer Toyota, Lokasi Agung Toyota, Kontak Toyota, Bengkel Resmi Toyota',
};

export default function DealerInfo() {
  return (
    <div className="py-16 bg-white dark:bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Dealer <span className="text-toyota-red">Agung Toyota</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Kunjungi cabang kami untuk melihat langsung koleksi kendaraan Toyota, melakukan test drive, atau servis kendaraan Anda di bengkel resmi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-zinc-800 pb-4">
              Informasi Kontak
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-toyota-red/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-toyota-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Alamat Lengkap</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Samping Pergudangan Coin Mas, Jl. Sudirman, Taman Baloi, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29432
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-toyota-red/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-toyota-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Telepon / WhatsApp</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Sales: (021) 1234-5678<br />
                    WhatsApp: +62 813-8005-3428<br />
                    Service: (021) 8765-4321
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-toyota-red/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-toyota-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Jam Operasional</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Senin - Jumat: 08.00 - 16.00 WIB<br />
                    Sabtu: 08.00 - 13.00 WIB<br />
                    Minggu: Tutup
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="h-[500px] bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-lg relative group border border-gray-200 dark:border-zinc-700">
            {/* Embedded Google Maps representation */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-6 py-4 rounded-xl shadow-xl text-center transform transition-transform group-hover:scale-105">
                <div className="text-4xl mb-2">📍</div>
                <h3 className="font-bold text-gray-900 dark:text-white">Agung Toyota Batam Centre</h3>
                <p className="text-sm text-gray-500 mt-1">Peta Lokasi Interaktif</p>
                <a
                    href="https://maps.google.com/?q=Agung+Toyota+Batam+Centre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-4 py-2 bg-toyota-red text-white text-sm font-semibold rounded-lg hover:bg-toyota-darkred transition-colors"
                  >
                    Buka di Google Maps
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
