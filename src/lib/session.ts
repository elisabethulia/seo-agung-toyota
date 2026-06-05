import { cookies } from "next/headers";
import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const SESSION_SECRET = process.env.SESSION_SECRET || "agung-toyota-secret-key-1234567890-default-key";

// Derive a 32-byte key from the secret securely using SHA-256
const KEY = crypto.createHash("sha256").update(SESSION_SECRET).digest();
const IV_LENGTH = 16; // AES-256-CBC IV size is 16 bytes

export function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(text: string) {
  try {
    const textParts = text.split(":");
    const ivHex = textParts.shift();
    if (!ivHex) return null;
    
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = textParts.join(":");
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Session decryption error:", error);
    return null;
  }
}

export async function createSession(adminData: { id: number; email: string; nama: string }) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day expiration
  const sessionData = JSON.stringify({ ...adminData, expiresAt: expiresAt.toISOString() });
  const encryptedSession = encrypt(sessionData);
  
  const cookieStore = await cookies();
  cookieStore.set("session", encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  
  const decrypted = decrypt(session);
  if (!decrypted) return null;
  
  try {
    const parsed = JSON.parse(decrypted);
    if (new Date(parsed.expiresAt) < new Date()) {
      return null;
    }
    return parsed;
  } catch (e) {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
