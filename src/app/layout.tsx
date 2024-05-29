import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/bar/topbar";
import Sidebar from "@/components/bar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digio Stock Inventory",
  description: "Digio Inventory",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Topbar />
          <main className="flex-grow boxshadow rounded-[1rem]">{children}</main>
        </div>
      </body>
    </html>
  );
}
