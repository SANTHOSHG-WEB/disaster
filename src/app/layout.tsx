"use client";

import { useState } from "react";
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
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Disaster Management Education Platform</title>
        <meta name="description" content="Learn. Prepare. Stay Safe. Comprehensive disaster preparedness for schools and colleges." />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={outfit.className}>
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
                  <Header onAIChatToggle={() => setIsAIChatOpen(!isAIChatOpen)} />
                  <main className="flex-grow pt-32 pb-24 md:pb-8">
                    {children}
                  </main>
                  <Footer />
                  <MobileNavigation onAIChatToggle={() => setIsAIChatOpen(!isAIChatOpen)} />
                  <AIChat externalIsOpen={isAIChatOpen} onExternalToggle={setIsAIChatOpen} />
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
