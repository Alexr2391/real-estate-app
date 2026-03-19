import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real estate app",
  description: "create, edit, publish property portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
