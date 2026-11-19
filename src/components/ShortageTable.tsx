"use client";

import { shortageData } from "@/data/mock-data";
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

export default function ShortageTable() {
  const { t, tr, locale } = useLanguage();
  const d = t.dashboard;
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{d.colContinent}</TableHead>
            <TableHead>{d.colRegion}</TableHead>
            <TableHead className="text-right">{d.colShortage}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shortageData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Badge variant="secondary">{tr(item.continent)}</Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{tr(item.region)}</div>
                <div className="text-sm text-muted-foreground">{tr(item.event)}</div>
              </TableCell>
              <TableCell className="text-right font-medium text-destructive">
                {item.amount.toLocaleString(locale)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
