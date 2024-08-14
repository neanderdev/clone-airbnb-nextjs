import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { ClientOnly } from "./components/ClientOnly";
import { LoginModal } from "./components/modals/LoginModal";
import { RegisterModal } from "./components/modals/RegisterModal";
import { Navbar } from "./components/navbar/Navbar";

import { ToasterProvider } from "./providers/ToasterProvider";

import { getCurrentUser } from "./actions/getCurrentUser";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />

          <LoginModal />
          <RegisterModal />

          <Navbar currentUser={currentUser} />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
