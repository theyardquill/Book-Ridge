import { Footer, Navbar } from '@/components';
import './globals.css';
import type { Metadata, Viewport } from 'next'; // Import Viewport
import { Urbanist } from 'next/font/google';
import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import FloatingWhatsAppIcon from '../components/floating-whatsapp-icon'; // Import the floating icon

const urban = Urbanist({ subsets: ['latin'] });

// Define metadata
export const metadata: Metadata = {
  title: 'Book Ridge Limited',
  description: 'Easily Book Safaris, Tours and Road Trips',
};

// Define viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/public/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/public/favicon.svg" />
<link rel="shortcut icon" href="/public/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Bookridge" />
<link rel="manifest" href="/public/site.webmanifest" />
      </head>
      <body className={urban.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsAppIcon /> {/* Add the floating icon here */}
      </body>
    </html>
  );
}