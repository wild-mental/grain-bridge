"use client";

import { useState } from "react";
import { topMatchesData } from "@/data/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CalendarClock, Radar, Ship } from "lucide-react";
import { DonationDialog } from "./DonationDialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MatchData } from "@/types";

const INITIAL_VISIBLE_COUNT = 15;

/** Deterministic sample logistics meta for the demo (not real carriers or schedules). */
function sampleLogistics(match: MatchData) {
  return {
    carrierNo: String(((match.id * 7) % 12) + 1).padStart(2, "0"),
    etaDays: 10 + ((match.id * 13) % 30),
    trackable: match.feasibility >= 0.85,
  };
}

export default function MatchMaker() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const { t, tr, locale } = useLanguage();
  const d = t.match;

  const showMore = () => {
    setVisibleCount(topMatchesData.length);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>{d.cardTitle}</CardTitle>
          <Badge variant="outline" className="border-accent bg-accent/15 text-accent-foreground">{d.mockBadge}</Badge>
        </div>
        <CardDescription>
          {d.cardDesc} {d.mockNote}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {topMatchesData.slice(0, visibleCount).map((match) => {
            const meta = sampleLogistics(match);
            const pct = Math.min(100, Math.round((match.donatedAmount / match.shippingCost) * 100));
            return (
              <div key={match.id} className="flex flex-col gap-4 rounded-lg border bg-background p-4 transition-colors hover:bg-muted/50 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-grow space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="border-surplus/60 bg-surplus/10 text-surplus-strong">{tr(match.surplusContinent)}</Badge>
                    <span className="font-semibold text-foreground">{tr(match.surplusRegion)}</span>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                    <Badge variant="outline" className="border-shortage/40 bg-shortage/5 text-shortage">{tr(match.shortageContinent)}</Badge>
                    <span className="font-semibold text-foreground">{tr(match.shortageRegion)}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground tabular-nums">
                    <span>{d.commodity}: <span className="font-medium text-foreground">{tr(match.commodity)}</span></span>
                    <span>{d.volume}: <span className="font-medium text-foreground">{match.tonnage.toLocaleString(locale)} Mt</span></span>
                  </div>
                  {/* Logistics meta (sample values) */}
                  <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <div className="inline-flex items-center gap-1.5">
                      <Ship className="h-3.5 w-3.5" aria-hidden="true" />
                      <dt>{d.carrier}:</dt>
                      <dd className="font-medium text-foreground">{d.carrierValue(meta.carrierNo)}</dd>
                    </div>
                    <div className="inline-flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                      <dt>{d.eta}:</dt>
                      <dd className="font-medium text-foreground tabular-nums">{d.etaValue(meta.etaDays)}</dd>
                    </div>
                    <div className="inline-flex items-center gap-1.5">
                      <Radar className="h-3.5 w-3.5" aria-hidden="true" />
                      <dt>{d.tracking}:</dt>
                      <dd className={meta.trackable ? "font-medium text-success" : "font-medium text-foreground"}>
                        {meta.trackable ? d.trackingLive : d.trackingPending}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
                  <div className="min-w-[200px] flex-shrink-0">
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">{d.funded}</span>
                      <span className="font-bold tabular-nums text-primary">{pct}%</span>
                    </div>
                    <Progress
                      value={pct}
                      className="mt-1 h-2 bg-muted [&>div]:bg-success"
                      aria-label={`${d.funded} ${pct}%`}
                    />
                    <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                      {formatCurrency(match.donatedAmount)} / {formatCurrency(match.shippingCost)}
                    </p>
                  </div>
                  <DonationDialog shipment={match}>
                    <Button className="w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90 sm:w-auto">
                      {d.donate}
                    </Button>
                  </DonationDialog>
                </div>
              </div>
            );
          })}
        </div>
        {visibleCount < topMatchesData.length && (
          <div className="pt-4 text-center">
            <Button variant="outline" onClick={showMore}>
              {d.showMore(topMatchesData.length - visibleCount)}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
