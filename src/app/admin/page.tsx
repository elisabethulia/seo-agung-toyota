import { prisma } from "@/lib/prisma";
import { cars as initialCars } from "@/data/cars";
import AdminMobilTable from "@/components/AdminMobilTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Try to load from database
  let dbCars = await prisma.kendaraan.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Automatically seed the database if it is empty so it isn't blank
  if (dbCars.length === 0) {
    try {
      await Promise.all(
        initialCars.map((car) =>
          prisma.kendaraan.create({
            data: {
              nama: car.name,
              slug: car.slug,
              harga: car.price,
              tipe: car.type,
              deskripsi: car.description,
              gambar: car.image,
              warna: JSON.stringify(car.colors),
              fitur: JSON.stringify(car.features),
            },
          })
        )
      );
      // Re-fetch
      dbCars = await prisma.kendaraan.findMany({
        orderBy: { createdAt: "desc" },
      });
      console.log("SEEDED DATABASE SUCCESS WITH MOCK CARS");
    } catch (err) {
      console.error("FAILED SEEDING DB ON FIRST RUN:", err);
    }
  }

  // Calculate statistics
  const totalVehicles = dbCars.length;
  const uniqueTypes = Array.from(new Set(dbCars.map((c) => c.tipe))).length;
  
  // Format cars to pass to the client table component
  const formattedCars = dbCars.map((car) => ({
    id: car.id,
    nama: car.nama,
    slug: car.slug,
    harga: car.harga,
    tipe: car.tipe,
    gambar: car.gambar,
  }));

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Admin</h1>
        <p className="mt-2 text-sm text-gray-600">
          Selamat datang di panel admin Agung Toyota. Di sini Anda bisa mengelola konten daftar mobil, harga, tipe, dan spesifikasinya.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white border border-gray-200/80 p-6 rounded-3xl relative overflow-hidden group hover:border-gray-300 transition-colors shadow-sm">
          <div className="absolute top-0 right-0 p-4 text-3xl opacity-15 select-none">🚗</div>
          <p className="text-xs uppercase tracking-wider font-bold text-gray-500">Total Kendaraan</p>
          <p className="text-4xl font-extrabold text-gray-900 mt-2 group-hover:scale-105 transition-transform origin-left duration-300">
            {totalVehicles}
          </p>
          <p className="text-xs text-gray-500 mt-2">Mobil terdaftar di database</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white border border-gray-200/80 p-6 rounded-3xl relative overflow-hidden group hover:border-gray-300 transition-colors shadow-sm">
          <div className="absolute top-0 right-0 p-4 text-3xl opacity-15 select-none">🏷️</div>
          <p className="text-xs uppercase tracking-wider font-bold text-gray-500">Kategori Tipe</p>
          <p className="text-4xl font-extrabold text-gray-900 mt-2 group-hover:scale-105 transition-transform origin-left duration-300">
            {uniqueTypes}
          </p>
          <p className="text-xs text-gray-500 mt-2">Kategori kendaraan unik</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white border border-gray-200/80 p-6 rounded-3xl relative overflow-hidden group hover:border-gray-300 transition-colors shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 p-4 text-3xl opacity-15 select-none">📅</div>
          <p className="text-xs uppercase tracking-wider font-bold text-gray-500">Status Sistem</p>
          <div className="flex items-center gap-2 mt-3.5">
            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-lg font-bold text-gray-900">Online & Terhubung</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Koneksi Database MySQL Aktif</p>
        </div>
      </div>

      {/* Main Vehicle Management Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Daftar Konten Mobil</h2>
        <AdminMobilTable initialCars={formattedCars} />
      </div>
    </div>
  );
}
