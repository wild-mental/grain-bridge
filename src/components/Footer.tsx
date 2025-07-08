import Link from "next/link";
import GrainBridgeLogo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <GrainBridgeLogo className="h-6 w-6" />
            <p className="text-sm font-semibold">GrainBridge</p>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} GrainBridge. A Wild &amp; Contributors Project.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
