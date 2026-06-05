import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

const nama = formData.get("nama")?.toString() || "";
const slug = formData.get("slug")?.toString() || "";

const hargaRaw = formData.get("harga")?.toString() || "";
const hargaCleaned = hargaRaw.replace(/[^0-9]/g, ""); // Hanya menyisakan angka saja
const harga = Number(hargaCleaned) || 0;

const tipe = formData.get("tipe")?.toString() || "";
const deskripsi = formData.get("deskripsi")?.toString() || "";

    const parseJSON = (value: string | null) => {
      try {
        return value ? JSON.parse(value) : [];
      } catch {
        return [];
      }
    };

    const warna = parseJSON(formData.get("warna") as string);
    const fitur = parseJSON(formData.get("fitur") as string);

   const gambar = formData.get("gambar")?.toString() || "";

    if (!nama || !slug || !harga || !tipe || !deskripsi || !gambar) {
      return NextResponse.json(
        { message: "Field wajib diisi" },
        { status: 400 }
      );
    }

    const existingCar = await prisma.kendaraan.findUnique({
      where: { slug },
    });

    if (existingCar) {
      return NextResponse.json(
        {
          message: "Slug sudah digunakan, gunakan nama atau slug lain",
        },
        { status: 400 }
      );
    }

    const newCar = await prisma.kendaraan.create({
      data: {
        nama,
        slug,
        harga: Number(harga),
        tipe,
        deskripsi,
        gambar,
        warna: JSON.stringify(warna),
        fitur: JSON.stringify(fitur),
      },
    });

    return NextResponse.json({
      message: "Kendaraan berhasil ditambahkan",
      car: newCar,
    });
  } catch (error) {
    console.error("ERROR POST MOBIL:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}