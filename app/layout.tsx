import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/themes/theme_provider";
import { sessionInfo } from "@/lib/db/serverMethods/sessionServerMethods";
import { Toaster } from "sonner";
import { AuthProvider } from "./AuthContext";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await sessionInfo();

  return (
    <html lang="fr" suppressHydrationWarning={true} data-lf-installed="true">
      <ThemeProvider defaultTheme="dark" storageKey="eventloop-theme">
        <body className="flex flex-col min-h-screen">
          <AuthProvider initialAuth={session}>
            <Toaster position="bottom-right" expand richColors />
            <Header />
            <main className="px-5 py-7">{children}</main>
          </AuthProvider>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
