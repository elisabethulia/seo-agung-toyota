import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          {/* Using a solid color or gradient as a placeholder since we don't have an image file yet */}
          <div className="w-full h-full bg-zinc-800 bg-cover bg-center" />
        </div>
        
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Promo <span className="text-toyota-red">Agung Toyota</span> Terbaik
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Dapatkan pengalaman berkendara luar biasa dengan koleksi mobil Toyota terbaru. Temukan penawaran eksklusif dan diskon spesial bulan ini.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/mobil" 
                className="px-8 py-3.5 text-lg font-bold text-white bg-toyota-red hover:bg-toyota-darkred rounded-full shadow-[0_0_20px_rgba(235,10,30,0.4)] transition-all hover:scale-105"
              >
                Lihat Daftar Mobil
              </Link>
              <Link 
                href="/dealer" 
                className="px-8 py-3.5 text-lg font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full transition-all hover:scale-105"
              >
                Hubungi Dealer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section (SEO friendly text) */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mengapa Memilih Agung Toyota?
            </h2>
            <div className="w-24 h-1 bg-toyota-red mx-auto rounded-full mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Sebagai dealer resmi pilihan utama, kami tidak hanya menawarkan harga bersaing, tetapi juga pelayanan purna jual yang terjamin. Kami hadir untuk membantu Anda menemukan mobil yang tepat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Harga Terbaik & Transparan",
                desc: "Dapatkan penawaran harga Toyota terbaru dengan diskon spesial tanpa biaya tersembunyi.",
                icon: "💰"
              },
              {
                title: "Layanan Purna Jual Unggul",
                desc: "Jaringan bengkel resmi yang luas dan suku cadang asli Toyota menjamin mobil Anda selalu prima.",
                icon: "🛠️"
              },
              {
                title: "Proses Kredit Mudah",
                desc: "Kerjasama dengan berbagai perusahaan pembiayaan untuk memberikan cicilan ringan dan proses cepat.",
                icon: "📄"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-zinc-800/50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-zinc-800">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-toyota-black overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-toyota-red/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-toyota-red/10 blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Siap Memiliki Mobil Impian Anda?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Kunjungi dealer kami atau lihat spesifikasi lengkap mobil Toyota terbaru yang sesuai dengan kebutuhan dan gaya hidup Anda.
          </p>
          <Link 
            href="/mobil" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-toyota-black bg-white hover:bg-gray-100 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Eksplorasi Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
