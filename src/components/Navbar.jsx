import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-14 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="text-lg font-bold text-gray-800">
          🎬 AcmCloud
        </Link>

        {/* Menu */}
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            Home
          </Link>

          <Link
            href="/upload"
            className="rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
