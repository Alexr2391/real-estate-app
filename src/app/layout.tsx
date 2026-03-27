import { Providers } from '@/contexts/providers';
import '@/styles/global.scss';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SideNav } from './(ui)/components/SideNav/SideNav';
import css from './RootLayout.module.scss';

export const metadata: Metadata = {
  title: 'Real estate app',
  description: 'create, edit, publish property portfolio',
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <Providers>
          <main className={css.main}>
            <SideNav />
            <div className={css.mainScreen}>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
