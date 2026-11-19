"use client";

import Link from "next/link";
import GrainBridgeLogo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { DonationDialog } from "./DonationDialog";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <LanguageToggle />
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-2 flex items-center space-x-2">
            <GrainBridgeLogo className="h-8 w-8 text-primary" />
            <span className="font-bold font-headline text-lg">GrainBridge</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-4">
          <Link href="#dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.header.dashboard}
          </Link>
          <Link href="#impact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.header.impact}
          </Link>
        </nav>
        <div className="flex items-center justify-end">
          <DonationDialog>
            <Button>
              {t.header.donateNow}
            </Button>
          </DonationDialog>
        </div>
      </div>
    </header>
  );
}
