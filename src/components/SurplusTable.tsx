"use client";

import { surplusData } from "@/data/mock-data";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function SurplusTable() {
  const { t, tr, locale } = useLanguage();
  const d = t.dashboard;
  return (
    <div className="rounded-lg border">
      <Table className="tabular-nums">
        <TableHeader>
          <TableRow>
            <TableHead>{d.colContinent}</TableHead>
            <TableHead>{d.colRegion}</TableHead>
            <TableHead className="text-right">{d.colSurplus}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {surplusData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Badge variant="secondary">{tr(item.continent)}</Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{tr(item.region)}</div>
                <div className="text-sm text-muted-foreground">{tr(item.event)}</div>
              </TableCell>
              <TableCell className="text-right font-semibold text-surplus-strong">
                +{item.amount.toLocaleString(locale)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
