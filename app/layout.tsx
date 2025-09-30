"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/themes/theme_provider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning={true} data-lf-installed="true">
      <ThemeProvider defaultTheme="dark" storageKey="eventloop-theme">
        <body className="flex flex-col min-h-screen">
          <Header />
          <main className="px-5 py-7">{children}</main>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
