import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNavigation from "@/components/layout/MobileNavigation";
import AIChat from "@/components/layout/AIChat";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Disaster Management Education Platform",
  description: "Learn. Prepare. Stay Safe. Comprehensive disaster preparedness for schools and colleges.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProvider>
          <AuthProvider>
            <ProgressProvider>
              <ThemeProvider
                attribute="data-theme"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow pt-32 pb-24 md:pb-8">
                    {children}
                  </main>
                  <Footer />
                  <MobileNavigation />
                  <AIChat />
                  <Toaster />
                </div>
              </ThemeProvider>
            </ProgressProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
