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