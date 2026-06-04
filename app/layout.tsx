import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { ScrollScene } from "@/components/scroll-scene";

export const metadata: Metadata = {
  title: "SajhaStack — Nepal's Developer Community",
  description:
    "Connecting developers across Nepal through hackathons, meetups, workshops, and open source collaboration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <ScrollScene />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
