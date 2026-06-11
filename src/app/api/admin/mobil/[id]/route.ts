import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";

// ===================== PUT =====================
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (!numericId) {
      return NextResponse.json(
        { message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const nama = formData.get("nama")?.toString() || "";
    const slug = formData.get("slug")?.toString() || "";

    const hargaRaw = formData.get("harga")?.toString() || "";
    const hargaCleaned = hargaRaw.replace(/[^0-9]/g, ""); 
    const harga = Number(hargaCleaned) || 0;

    const tipe = formData.get("tipe")?.toString() || "";
    const deskripsi = formData.get("deskripsi")?.toString() || "";

    const gambar = formData.get("gambar")?.toString().trim() || "";

    const parseJSON = (value: string | null) => {
      try {
        return value ? JSON.parse(value) : [];
      } catch {
        return [];
      }
    };

    const warnaParsed = parseJSON(formData.get("warna") as string);
    const fiturParsed = parseJSON(formData.get("fitur") as string);

    // ✅ FIX 1: Memakai hargaRaw untuk pengecekan agar angka 0 tidak dianggap error kosong
    if (!nama || !slug || !hargaRaw || !tipe || !deskripsi || !gambar) {
      return NextResponse.json(
        { message: "Field wajib diisi" },
        { status: 400 }
      );
    }

    // cek slug unik
    const existingCar = await prisma.kendaraan.findFirst({
      where: {
        slug,
        id: { not: numericId },
      },
    });

    if (existingCar) {
      return NextResponse.json(
        { message: "Slug sudah digunakan" },
        { status: 400 }
      );
    }

    const updatedCar = await prisma.kendaraan.update({
      where: { id: numericId }, 
      data: {
        nama,
        slug,
        harga: Number(harga),
        tipe,
        deskripsi,
        gambar,
        warna: JSON.stringify(warnaParsed),
        fitur: JSON.stringify(fiturParsed),
      },
    });

    return NextResponse.json({
      message: "Kendaraan berhasil diperbarui",
      car: updatedCar,
    });
  } catch (error) {
    console.error("ERROR UPDATE MOBIL:", error); 
    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}

// ===================== DELETE =====================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (!numericId) {
      return NextResponse.json(
        { message: "ID tidak valid" },
        { status: 400 }
      );
    }

    await prisma.kendaraan.delete({
      where: { id: numericId },
    });

    return NextResponse.json({
      message: "Mobil berhasil dihapus",
    });
  } catch (error) {
    console.error("ERROR DELETE MOBIL:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}