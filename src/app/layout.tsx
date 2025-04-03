import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalBackground from "@/components/layout/GlobalBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Achyut Mukund | Portfolio",
  description: "Computer Science undergraduate at VIT Chennai specializing in blockchain, web, and app development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen relative" suppressHydrationWarning>
            <GlobalBackground />
            <Navbar />
            <main className="flex-grow relative z-10" suppressHydrationWarning>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
