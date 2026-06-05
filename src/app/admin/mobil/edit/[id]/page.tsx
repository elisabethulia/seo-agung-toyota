import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditMobilForm from "@/components/EditMobilForm";

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPage({ params }: { params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = parseInt(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const car = await prisma.kendaraan.findUnique({
    where: { id: numericId },
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

  const formattedCar = {
    ...car,
    warna: warnaArr,
    fitur: fiturArr,
  };

  return <EditMobilForm initialCar={formattedCar} />;
}
