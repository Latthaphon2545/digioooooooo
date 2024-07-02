import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navBar/navBar";
import "../globals.css";

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
        <NavBar>{children}</NavBar>
      </body>
    </html>
  );
}
