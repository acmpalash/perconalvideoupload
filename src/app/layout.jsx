// src/app/layout.jsx
import "./globals.css";
import AppGate from "@/components/AppGate";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppGate>
          <Navbar />
          {children}
        </AppGate>
      </body>
    </html>
  );
}
