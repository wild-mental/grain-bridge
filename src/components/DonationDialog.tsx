"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, HeartHandshake, ShieldCheck, Ship } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MatchData } from "@/types";
import foodAidSacks from "../../public/images/rice-sacks-stack-iloilo.webp";

/**
 * Pledge flow: confirm the shipment → choose an amount → thank-you screen.
 * It collects no personal or payment data and sends nothing anywhere; the amount lives only in component state.
 */
type Step = "confirm" | "amount" | "thanks";

const PRESETS = [10, 25, 50, 100] as const;
const DEFAULT_PRESET = 25;

export function DonationDialog({ children, shipment }: { children: React.ReactNode; shipment: MatchData }) {
  const { t, tr, locale } = useLanguage();
  const d = t.donation;

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("confirm");
  const [preset, setPreset] = useState<number | null>(DEFAULT_PRESET);
  const [custom, setCustom] = useState("");
  const [showError, setShowError] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const usd = (n: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const customValue = Number(custom);
  const amount = custom.trim() !== "" ? customValue : preset ?? 0;
  const amountValid = Number.isFinite(amount) && amount >= 1;

  const route = `${tr(shipment.surplusRegion)} → ${tr(shipment.shortageRegion)}`;
  const commodity = tr(shipment.commodity);
  const pct = Math.min(100, Math.round((shipment.donatedAmount / shipment.shippingCost) * 100));
  const remaining = Math.max(0, shipment.shippingCost - shipment.donatedAmount);

  // Freight cost per tonne on this shipment, used for the "what this amount moves" hint.
  const tonnesMoved = amountValid ? amount / (shipment.shippingCost / shipment.tonnage) : 0;
  const movedLabel =
    tonnesMoved >= 1
      ? `${tonnesMoved.toLocaleString(locale, { maximumFractionDigits: 1 })} t`
      : `${(Math.round(tonnesMoved * 100) * 10).toLocaleString(locale)} kg`;

  // Move focus to the new step's heading so keyboard and screen-reader users follow the flow.
  useEffect(() => {
    if (open) titleRef.current?.focus();
  }, [step, open]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset after the closing animation.
      setTimeout(() => {
        setStep("confirm");
        setPreset(DEFAULT_PRESET);
        setCustom("");
        setShowError(false);
      }, 200);
    }
  };

  const submitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountValid) {
      setShowError(true);
      return;
    }
    setStep("thanks");
  };

  const stepIndicator = (n: number) => (
    <p className="text-xs font-bold uppercase tracking-widest text-primary">{d.stepLabel(n, 2)}</p>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          titleRef.current?.focus();
        }}
        className={cn(
          "max-h-[92svh] overflow-y-auto sm:max-w-[480px]",
          // The close button sits on the photo strip in the first two steps.
          step !== "thanks" &&
            "[&>button:last-child]:rounded-full [&>button:last-child]:bg-overlay/60 [&>button:last-child]:p-1 [&>button:last-child]:text-white [&>button:last-child]:opacity-100",
        )}
      >
        {step !== "thanks" && (
          <div className="relative -mx-6 -mt-6 h-24 overflow-hidden sm:rounded-t-lg">
            <Image src={foodAidSacks} alt={d.imageAlt} fill placeholder="blur" sizes="480px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-overlay/60 via-overlay/10 to-overlay/40" aria-hidden="true" />
          </div>
        )}

        {step === "confirm" && (
          <>
            <DialogHeader className="space-y-2 text-left">
              {stepIndicator(1)}
              <DialogTitle ref={titleRef} tabIndex={-1} className="outline-none">
                {d.confirmTitle}
              </DialogTitle>
              <DialogDescription>{d.confirmDesc}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 rounded-lg border bg-muted/40 p-4">
              <div className="flex items-start gap-3">
                <Ship className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-xs text-muted-foreground">{d.route}</p>
                  <p className="font-semibold text-foreground">{route}</p>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">{d.commodity}</dt>
                  <dd className="font-medium text-foreground">{commodity}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">{d.volume}</dt>
                  <dd className="font-medium tabular-nums text-foreground">{shipment.tonnage.toLocaleString(locale)} t</dd>
                </div>
              </dl>
              <div>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{d.funded}</span>
                  <span className="font-bold tabular-nums text-primary">{pct}%</span>
                </div>
                <Progress value={pct} className="mt-1 h-2 bg-muted [&>div]:bg-success" aria-label={`${d.funded} ${pct}%`} />
                <p className="mt-1.5 flex flex-wrap justify-between gap-x-3 text-xs tabular-nums text-muted-foreground">
                  <span>
                    {usd(shipment.donatedAmount)} / {usd(shipment.shippingCost)}
                  </span>
                  <span className="font-medium text-foreground">{remaining > 0 ? d.remaining(usd(remaining)) : d.fullyFunded}</span>
                </p>
              </div>
            </div>

            <p className="text-sm font-medium text-foreground">{d.useOfFunds}</p>

            <DialogFooter>
              <Button className="w-full" onClick={() => setStep("amount")}>
                {d.next}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "amount" && (
          <form onSubmit={submitPledge} noValidate className="space-y-5">
            <DialogHeader className="space-y-2 text-left">
              {stepIndicator(2)}
              <DialogTitle ref={titleRef} tabIndex={-1} className="outline-none">
                {d.amountTitle}
              </DialogTitle>
              <DialogDescription>{d.amountDesc(route)}</DialogDescription>
            </DialogHeader>

            <fieldset>
              <legend className="mb-2 text-sm font-medium">{d.presetsLabel}</legend>
              <div className="grid grid-cols-4 gap-2">
                {PRESETS.map((value) => {
                  const selected = custom.trim() === "" && preset === value;
                  return (
                    <Button
                      key={value}
                      type="button"
                      variant={selected ? "default" : "outline"}
                      aria-pressed={selected}
                      className="h-11 font-bold tabular-nums"
                      onClick={() => {
                        setPreset(value);
                        setCustom("");
                        setShowError(false);
                      }}
                    >
                      {usd(value)}
                    </Button>
                  );
                })}
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="pledge-custom-amount">{d.customLabel}</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">
                  $
                </span>
                <Input
                  id="pledge-custom-amount"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  placeholder={d.customPlaceholder}
                  className="pl-7 tabular-nums"
                  value={custom}
                  aria-invalid={showError && !amountValid}
                  aria-describedby={showError && !amountValid ? "pledge-amount-error" : "pledge-amount-hint"}
                  onChange={(e) => {
                    setCustom(e.target.value);
                    setShowError(false);
                  }}
                />
              </div>
              {showError && !amountValid ? (
                <p id="pledge-amount-error" className="text-sm font-medium text-destructive">
                  {d.errAmount}
                </p>
              ) : (
                <p id="pledge-amount-hint" className="text-sm text-muted-foreground" aria-live="polite">
                  {amountValid ? d.impactHint(movedLabel, commodity) : " "}
                </p>
              )}
            </div>

            <p className="flex gap-2 rounded-md bg-muted px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              {d.noPayment}
            </p>

            <DialogFooter className="flex-row gap-2 sm:space-x-0">
              <Button type="button" variant="outline" onClick={() => setStep("confirm")}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {d.back}
              </Button>
              <Button type="submit" className="flex-1">
                {amountValid ? d.submitWithAmount(usd(amount)) : d.submit}
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === "thanks" && (
          <div className="flex flex-col items-center space-y-4 py-6 text-center">
            <HeartHandshake className="h-14 w-14 text-accent" aria-hidden="true" />
            <DialogTitle ref={titleRef} tabIndex={-1} className="text-2xl outline-none">
              {d.thanksTitle}
            </DialogTitle>
            <DialogDescription className="max-w-sm text-base">{d.thanksBody(usd(amount), route)}</DialogDescription>
            <p className="max-w-sm text-xs text-muted-foreground">{d.thanksNote}</p>
            <DialogClose asChild>
              <Button className="mt-2">{d.close}</Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
