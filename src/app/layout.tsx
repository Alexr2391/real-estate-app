import type { Metadata } from 'next';
import '@/styles/global.scss';
import css from './RootLayout.module.scss';
import { SideNav } from './(ui)/components/SideNav/SideNav';

export const metadata: Metadata = {
  title: 'Real estate app',
  description: 'create, edit, publish property portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={css.main}>
        <main className={css.main}>
          <SideNav />
          <div className={css.mainScreen}>{children}</div>
        </main>
      </body>
    </html>
  );
}
