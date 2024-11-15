import type { Metadata } from 'next';
import { Gochi_Hand } from 'next/font/google';
import './globals.css';

const gochiHand = Gochi_Hand({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={gochiHand.className}>{children}</div>
      </body>
    </html>
  );
}
