import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <span className="text-2xl font-bold text-toyota-red dark:text-toyota-red transition-transform group-hover:scale-105">
                AGUNG TOYOTA
              </span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="text-gray-900 dark:text-gray-100 hover:text-toyota-red dark:hover:text-toyota-red px-3 py-2 text-sm font-medium transition-colors">
                Beranda
              </Link>
              <Link href="/mobil" className="text-gray-900 dark:text-gray-100 hover:text-toyota-red dark:hover:text-toyota-red px-3 py-2 text-sm font-medium transition-colors">
                Daftar Mobil
              </Link>
              <Link href="/dealer" className="text-gray-900 dark:text-gray-100 hover:text-toyota-red dark:hover:text-toyota-red px-3 py-2 text-sm font-medium transition-colors">
                Kontak
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/login"
              className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-toyota-red hover:bg-toyota-darkred focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-toyota-red transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
