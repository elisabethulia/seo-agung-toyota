import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { nama, email, password } = await req.json();

    console.log("DATA MASUK:", { nama, email });

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log("EMAIL SUDAH ADA");

      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        nama,
        email,
        password: hashedPassword,
      },
    });

    console.log("ADMIN BERHASIL DIBUAT:", admin);

    return NextResponse.json(admin);
  } catch (error) {
    console.error("ERROR REGISTER:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}