import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navBar/navBar";
import "../globals.css";
import { getTheme } from "@/lib/actions/themeActions/action";
import { EditorProvider } from "@/lib/context/EditorProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digio Stock Inventory",
  description: "Digio Inventory",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const initialTheme = await getTheme();

  return (
    <html lang="en" data-theme={initialTheme}>
      <head>
        <link rel="icon" href="data:," />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body className={`${inter.className} flex`}>
        <EditorProvider>
          <NavBar>{children}</NavBar>
        </EditorProvider>
      </body>
    </html>
  );
}
