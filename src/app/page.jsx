import Media from "@/models/Media";
import { connectDB } from "@/lib/mongodb";
import MediaCard from "@/components/MediaCard";

export default async function Home() {
  await connectDB();
  const media = await Media.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-liner-gradient-to-b from-gray-300 to-gray-400 px-4 py-6 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="max-w-10xl mx-auto mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
          🎬 My Video & Audio Gallery
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          All your uploaded media in one place
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-10xl mx-auto grid item-center justify-center">
        {media.map((m) => (
          <MediaCard key={m._id} media={m} />
        ))}
      </div>

      {/* Empty State */}
      {media.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <div className="text-5xl mb-3">📂</div>
          <p className="text-lg font-medium">No media uploaded yet</p>
          <p className="text-sm">Upload your first video or audio from Admin</p>
        </div>
      )}
    </div>
  );
}
