"use client";

import { useState } from "react";
import { topMatchesData } from "@/data/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const INITIAL_VISIBLE_COUNT = 15;

export default function MatchMaker() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const showMore = () => {
    setVisibleCount(topMatchesData.length);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Priority Shipments</CardTitle>
        <CardDescription>
          These are the most impactful, pre-calculated matches. You can directly fund a shipment to make a difference.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {topMatchesData.slice(0, visibleCount).map((match) => (
            <div key={match.id} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background hover:bg-muted/50 transition-colors">
              <div className="flex-grow space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{match.surplusContinent}</Badge>
                  <span className="font-semibold text-foreground">{match.surplusRegion}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <Badge variant="outline" className="border-destructive/50 text-destructive">{match.shortageContinent}</Badge>
                  <span className="font-semibold text-foreground">{match.shortageRegion}</span>
                </div>
                 <div className="text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
                    <span>Commodity: <span className="font-medium text-foreground">{match.commodity}</span></span>
                    <span>Volume: <span className="font-medium text-foreground">{match.tonnage.toLocaleString()} Mt</span></span>
                 </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto self-stretch sm:self-center">
                 <div className="text-lg font-bold text-primary flex-shrink-0">
                    {formatCurrency(match.donatedAmount)} / {formatNumber(match.shippingCost)}
                 </div>
                <Button className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                  Donate
                </Button>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < topMatchesData.length && (
          <div className="text-center pt-4">
            <Button variant="outline" onClick={showMore}>
              Show More Matches ({topMatchesData.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
