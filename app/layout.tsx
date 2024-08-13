import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { ClientOnly } from "./components/ClientOnly";
import { RegisterModal } from "./components/modals/RegisterModal";
import { Navbar } from "./components/navbar/Navbar";

import { ToasterProvider } from "./providers/ToasterProvider";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />

          <RegisterModal />

          <Navbar />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
