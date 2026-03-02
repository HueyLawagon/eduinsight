import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EduInsight",
  description: "Student Performance Dashboard and Reporting Tool for Educators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-between w-full bg-gray-800 text-white mb-6 pt-8 pr-8 pl-8 pb-4">
                <h1 className="text-3xl font-bold">EduInsight</h1>
                <div className="flex gap-4">
                  <Link href="/"><h2 className="text-xl font-semibold underline">Dashboard</h2></Link>
                  <Link href="/Reports/"><h2 className="text-xl font-semibold underline">Reports</h2></Link>
                </div>
              </div>
        {children}
      </body>
    </html>
  );
}
