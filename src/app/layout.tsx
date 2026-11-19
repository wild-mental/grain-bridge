import type {Metadata} from 'next';
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/i18n/LanguageProvider";

// Korean-capable fonts (SIL OFL), self-hosted by next/font to avoid layout shift.
// Korean glyphs are split into unicode-range slices, so preloading is turned off.
const sans = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-sans',
});

const serif = Noto_Serif_KR({
  weight: ['700', '900'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'GrainBridge',
  description: '글로벌 식량 잉여 ↔ 부족 지역 연결 기부 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-body antialiased">
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
