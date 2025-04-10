import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConditionalBackground from "@/components/layout/ConditionalBackground";
import { SectionProvider } from "@/components/SectionProvider";

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
          <SectionProvider>
            <div className="flex flex-col min-h-screen relative" suppressHydrationWarning>
              <ConditionalBackground />
              <Navbar />
              <main className="flex-grow relative z-10" suppressHydrationWarning>{children}</main>
              <Footer />
            </div>
          </SectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
