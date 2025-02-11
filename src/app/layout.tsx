import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_components/footer/Footer";
import Header from "@components/header/header";

export const metadata: Metadata = {
  title: "별리 방송일정",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
