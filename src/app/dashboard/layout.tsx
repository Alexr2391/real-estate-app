import { ReactNode } from 'react';

interface DashBoardLayoutProps {
  children: ReactNode;
  edit: ReactNode;
  preview: ReactNode;
}

export default function DashboardLayout({
  children,
  edit,
  preview,
}: DashBoardLayoutProps) {
  return (
    <section>
      {children}
      {edit}
      {preview}
    </section>
  );
}
