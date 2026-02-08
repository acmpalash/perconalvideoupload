export const runtime = "nodejs";

import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Media from "@/models/Media";


export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");

    if (!file || !title) {
      return new Response("File & title required", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "mediacloud" },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      ).end(buffer);
    });

    await connectDB();
    await Media.create({
      url: upload.secure_url,
      type: upload.resource_type,
      title,
      description,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return new Response("Upload failed", { status: 500 });
  }
}
