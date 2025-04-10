import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { WagmiConfig } from '@/lib/providers/wagmi';
import { AuthProvider } from '@/components/auth/AuthProvider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Email to Stables - Your Fintech Hub',
  description: 'Send and receive payments with style',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WagmiConfig>
            <AuthProvider>
              <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-background to-background">
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