import type { Metadata } from 'next';
import { Poppins, Lato } from 'next/font/google';
import './globals.scss';
import ScrollWrapper from '@/components/ui/ScrollWrapper';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BE Marketing Studio | Global Flagship Site',
  description: 'Convertimos experiencias de marca en resultados de negocio. Diseño de espacios, retail deportivo y activaciones orientadas a performance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} ${lato.variable}`} suppressHydrationWarning>
        <ScrollWrapper>
          <CustomCursor />
          <PageTransition>
            {children}
          </PageTransition>
        </ScrollWrapper>
      </body>
    </html>
  );
}
