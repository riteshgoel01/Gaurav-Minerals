import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata = {
  title: 'Gaurav Minerals | Premium Industrial Minerals Supplier',
  description: 'Leading supplier and exporter of premium industrial products including Red Oxide, Manganese Dioxide, Ferro Manganese Powder and Ferro Chrome Powder. 9+ years of excellence.',
  keywords: 'red oxide, manganese dioxide, ferro manganese powder, ferro chrome powder, industrial minerals, mineral supplier, mineral exporter, Delhi',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            duration: 5000,
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
