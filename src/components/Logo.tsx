import { cn } from "@/lib/utils";

const GrainBridgeLogo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-6 w-6", className)}
    {...props}
  >
    <path d="M2 22v-4a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4" />
    <path d="M2 14h20" />
    <path d="M12.5 14 12 4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1" />
    <path d="m14 14-1.5-3" />
    <path d="M12 9h.5" />
    <path d="m10 14 1.5-3" />
    <path d="M12.5 6.5 14 5" />
    <path d="m10 5 1.5 1.5" />
  </svg>
);
export default GrainBridgeLogo;
