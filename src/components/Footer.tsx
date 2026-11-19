"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import GrainBridgeLogo from "./Logo";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-4 py-10 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <GrainBridgeLogo className="h-6 w-6 text-primary" />
            <p className="text-sm font-semibold">GrainBridge</p>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t.footer.rights}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/principles" className="text-sm font-medium hover:underline">{t.footer.principles}</Link>
            <Link href="/privacy" className="text-sm hover:underline">{t.footer.privacy}</Link>
            <Link href="/terms" className="text-sm hover:underline">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
