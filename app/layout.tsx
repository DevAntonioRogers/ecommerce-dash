import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import Sidebar from "@/components/navigation/sidebar";
import ToasterProvider from "@/providers/toast-provider";
import { auth } from "@/server/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nexa Dashboard",
  description: "E-Commerce Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <ToasterProvider />
          <Navbar session={session} />
          <main className="flex">
            <Sidebar />
            <section className="min-h-screen flex-1">
              {children}
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
