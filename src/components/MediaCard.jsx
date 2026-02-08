export default function MediaCard({ media }) {
  return (
    <div className="group bg-white/90 backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
      {/* Title */}
      <div className="px-4 pt-4">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
          {media.title}
        </h3>
      </div>

      {/* Media */}
      <div className="mt-2 bg-black">
        {media.type === "video" && (
          <video
            src={media.url}
            controls
            className="w-full h-56 object-cover"
          />
        )}

        {media.type === "audio" && (
          <div className="p-4 bg-gray-100">
            <audio src={media.url} controls className="w-full" />
          </div>
        )}
      </div>

      {/* Description */}
      {media.description && (
        <div className="p-4 pt-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {media.description}
          </p>
        </div>
      )}
    </div>
  );
}
