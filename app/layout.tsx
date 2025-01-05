import './globals.css';
import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Snowfall } from '@/components/snowfall';
import { WagmiConfig } from '@/lib/providers/wagmi';
import { AuthProvider } from '@/components/auth/AuthProvider';

const spaceMono = Space_Mono({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'GiftQuest - Spread Holiday Joy',
  description: 'Send virtual Christmas gifts to your loved ones',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceMono.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WagmiConfig>
            <AuthProvider>
              <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/10 via-background to-background">
                <Snowfall />
                {children}
              </div>
            </AuthProvider>
            <Toaster />
          </WagmiConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}