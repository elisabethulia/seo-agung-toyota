import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Alamat email wajib diisi" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      // For security, don't explicitly say "email not found", but for dev convenience, let's allow testing easily
      return NextResponse.json(
        { message: "Jika email terdaftar, instruksi reset akan dikirim" },
        { status: 200 }
      );
    }

    // Generate random secure token
    const token = crypto.randomBytes(24).toString("hex");
    const tokenExpires = new Date(Date.now() + 60 * 60 * 1000); // Expires in 1 hour

    // Update admin record with token
    await prisma.admin.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpires: tokenExpires,
      },
    });

    const resetLink = `/reset-password?token=${token}`;
    console.log("==========================================");
    console.log("PASSWORD RESET REQUESTED FOR:", email);
    console.log("DEV MODE MOCK RESET LINK:", `http://localhost:3000${resetLink}`);
    console.log("==========================================");

    return NextResponse.json({
      message: "Instruksi reset kata sandi telah dikirim ke email Anda.",
      // In local dev, we return the mock link so the user can easily test it in their browser without an email server
      debugLink: resetLink,
    });
  } catch (error) {
    console.error("ERROR FORGOT PASSWORD:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}
