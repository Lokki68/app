import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventLoop App",
  description: "Gestion d'évenement collaboratif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning={true} data-lf-installed="true">
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <div className="flex w-full justify-end">
              <label
                htmlFor="my-drawer"
                className="btn btn-primary drawer-button"
              >
                Open drawer
              </label>
            </div>
            {children}
          </div>
          <Drawer />
        </div>
        <Footer />
      </body>
    </html>
  );
}
