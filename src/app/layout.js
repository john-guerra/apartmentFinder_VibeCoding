import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ApartmentFinder - Find Your Perfect Home",
  description: "Browse and manage apartment listings with ease",
};

import { testDatabaseConnection } from "./actions";

export default async function RootLayout({ children }) {
  const isConnected = await testDatabaseConnection();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <Navigation />
        <Breadcrumb />
        <main className="min-h-screen">
          {children}
        </main>

        {/* Database Connection Status (only show in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className={`px-3 py-2 rounded-full text-sm font-medium ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              DB: {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
