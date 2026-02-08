import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { password } = await req.json();
  const admin = await Admin.findOne();

  if (!admin) {
    return new Response("Not setup", { status: 404 });
  }

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    return new Response("Invalid password", { status: 401 });
  }

  return Response.json({ success: true });
}
