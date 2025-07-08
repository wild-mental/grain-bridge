import Link from "next/link";
import GrainBridgeLogo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-2 flex items-center space-x-2">
            <GrainBridgeLogo className="h-8 w-8 text-primary" />
            <span className="font-bold font-headline text-lg">GrainBridge</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-4">
          <Link href="#dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link href="#impact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Impact
          </Link>
        </nav>
        <div className="flex items-center justify-end">
          <Button>
            Donate Now
          </Button>
        </div>
      </div>
    </header>
  );
}
