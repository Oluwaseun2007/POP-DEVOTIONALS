import './globals.css';
import { Inter, Merriweather } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}