import type {Metadata} from 'next';
import './globals.css'; // Global styles
import SecurityGuard from '@/components/SecurityGuard';

export const metadata: Metadata = {
  title: 'VIP Study',
  description: 'VIP Study Application',
};

import ChunkLoadErrorHandler from '@/components/ChunkLoadErrorHandler';
import ConsoleGuard from '@/components/ConsoleGuard';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ConsoleGuard />
        <ChunkLoadErrorHandler />
        <SecurityGuard />
        {children}
      </body>
    </html>
  );
}
