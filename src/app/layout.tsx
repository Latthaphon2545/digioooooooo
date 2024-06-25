import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/navBar/topbar";
import { Sidebar } from "@/components/navBar/sidebar";

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
      <head>
        <link rel="shortcut icon" href="#" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body className={`${inter.className} flex`}>
        <div className="mobile:hidden tablet:hidden laptop:block">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-grow">
          <Topbar />
          <main className="flex-grow boxshadow mobile:mt-16 laptop:mt-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
