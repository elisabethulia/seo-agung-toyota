import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { writeFile } from "fs/promises";
import path from "path";

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

   const fileGambar = formData.get("gambar") as File | null;

    if (!nama || !slug || !harga || !tipe || !deskripsi || !fileGambar) {
      return NextResponse.json(
        { message: "Field wajib diisi dan gambar harus diunggah" },
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

    const buffer = Buffer.from(await fileGambar.arrayBuffer());

    const fileExtension = path.extname(fileGambar.name) || ".jpg";
    // const fileName = `mobil-${DataTransfer.now()}${fileExtension}`;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_')
    const fileName = `mobil-${timestamp}${fileExtension}`;

// 
    const publicStoragePath = path.join(process.cwd(), "public", "uploads", fileName);

    await writeFile(publicStoragePath, buffer);

    const dbImagePath = `/uploads/${fileName}`;

    const newCar = await prisma.kendaraan.create({
      data: {
        nama,
        slug,
        harga: Number(harga),
        tipe,
        deskripsi,
        gambar: dbImagePath,
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