
"use client";

import { useState } from "react";
import { topMatchesData } from "@/data/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { DonationDialog } from "./DonationDialog";
import { useLanguage } from "@/i18n/LanguageProvider";

const INITIAL_VISIBLE_COUNT = 15;

export default function MatchMaker() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const { t, tr, locale } = useLanguage();
  const d = t.match;

  const showMore = () => {
    setVisibleCount(topMatchesData.length);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{d.cardTitle}</CardTitle>
        <CardDescription>
          {d.cardDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {topMatchesData.slice(0, visibleCount).map((match) => (
            <div key={match.id} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background hover:bg-muted/50 transition-colors">
              <div className="flex-grow space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{tr(match.surplusContinent)}</Badge>
                  <span className="font-semibold text-foreground">{tr(match.surplusRegion)}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <Badge variant="outline" className="border-destructive/50 text-destructive">{tr(match.shortageContinent)}</Badge>
                  <span className="font-semibold text-foreground">{tr(match.shortageRegion)}</span>
                </div>
                 <div className="text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
                    <span>{d.commodity}: <span className="font-medium text-foreground">{tr(match.commodity)}</span></span>
                    <span>{d.volume}: <span className="font-medium text-foreground">{match.tonnage.toLocaleString(locale)} Mt</span></span>
                 </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto self-stretch sm:self-center">
                 <div className="text-lg font-bold text-primary flex-shrink-0">
                    {formatCurrency(match.donatedAmount)} / {formatNumber(match.shippingCost)}
                 </div>
                 <DonationDialog>
                    <Button className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                      {d.donate}
                    </Button>
                </DonationDialog>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < topMatchesData.length && (
          <div className="text-center pt-4">
            <Button variant="outline" onClick={showMore}>
              {d.showMore(topMatchesData.length - visibleCount)}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
