"use client";
import { useState, useRef } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);

  const upload = async () => {
    if (!file || !title) return alert("Title & file required");

    setLoading(true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title);
    fd.append("description", description);

    const res = await fetch("/api/media/upload", {
      method: "POST",
      body: fd,
    });

    setLoading(false);
    alert(res.ok ? "Uploaded!" : "Failed");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 sm:p-8 space-y-5">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Upload Media
        </h2>
        <p className="text-center text-sm text-gray-500">
          Upload your private video or audio to cloud storage
        </p>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter title..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Short description..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* File */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Media File</label>
          <div className="mx-4">
          <button 
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center justify-center gap-2 w-full bg-amber-400 cursor-pointer 
          rounded-lg border-2 border-dashed border-gray-300 px-1 py-4 text-blue-700 hover:border-black
          hover:text-black transition min-w-15">
            {file ? file.name : "Click to select video/audio"} 
            </button>
            <input
             ref={fileRef}
            type="file"
            accept="video/*,audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            />
          
        </div>
        </div>
        {/* Button */}
        <button
          onClick={upload}
          disabled={loading}
          className="w-full rounded-lg bg-black text-white py-2.5 font-medium hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
