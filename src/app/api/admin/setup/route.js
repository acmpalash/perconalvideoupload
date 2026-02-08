import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { password, confirmPassword } = await req.json();

  const exists = await Admin.findOne();
  if (exists) {
    return new Response("Already setup", { status: 400 });
  }

  if (!password || password !== confirmPassword) {
    return new Response("Passwords do not match", { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);
  await Admin.create({ passwordHash: hash });

  return Response.json({ success: true });
}
