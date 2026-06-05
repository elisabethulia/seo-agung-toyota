import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-toyota-black text-white mt-auto py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-toyota-red">Agung Toyota</h3>
            <p className="text-gray-400 text-sm">
              Dealer resmi Toyota terpercaya dengan layanan penjualan, servis, dan suku cadang terbaik. Temukan mobil impian Anda bersama kami.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/mobil" className="hover:text-white transition-colors">Daftar Mobil</Link>
              </li>
              <li>
                <Link href="/dealer" className="hover:text-white transition-colors">Informasi Dealer</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">Login Admin</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Samping Pergudangan Coin Mas, Jl. Sudirman, Taman Baloi, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29432.</li>
              <li>📞 (021) 1234-5678</li>
              <li>✉️ info@agungtoyota.co.id</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Agung Toyota. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
