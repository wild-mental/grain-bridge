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

export default function SurplusTable() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Continent</TableHead>
            <TableHead>Region/Event</TableHead>
            <TableHead className="text-right">Surplus (Million Tonnes)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {surplusData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Badge variant="secondary">{item.continent}</Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{item.region}</div>
                <div className="text-sm text-muted-foreground">{item.event}</div>
              </TableCell>
              <TableCell className="text-right font-medium text-green-500">
                +{item.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
