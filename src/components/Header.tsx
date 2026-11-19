"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GrainBridgeLogo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <LanguageToggle />
      <div className="container flex h-14 items-center gap-4 px-4 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center space-x-2">
          <GrainBridgeLogo className="h-8 w-8 text-primary" />
          <span className="font-headline text-lg font-bold">GrainBridge</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-5 md:flex">
          <a href="/#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.header.howItWorks}
          </a>
          <a href="/#dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.header.dashboard}
          </a>
          <a href="/#impact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.header.impact}
          </a>
        </nav>
        {/* Same label and destination as the hero CTA, so there is one primary action. */}
        <Button asChild className="ml-auto bg-accent font-bold text-accent-foreground hover:bg-accent/90">
          <a href="/#match-and-donate">
            {t.cta.fund}
            <ArrowRight className="hidden h-4 w-4 sm:block" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </header>
  );
}
