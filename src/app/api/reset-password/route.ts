import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: "Token dan password baru wajib diisi" },
        { status: 400 }
      );
    }

    // Find admin by resetToken and ensure token is not expired
    const admin = await prisma.admin.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(), // must be greater than current time
        },
      },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Token reset tidak valid atau telah kedaluwarsa" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update admin password and clear reset token fields
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return NextResponse.json({
      message: "Kata sandi berhasil diubah. Silakan login kembali.",
    });
  } catch (error) {
    console.error("ERROR RESET PASSWORD:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}
