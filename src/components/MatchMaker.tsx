"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { surplusData } from "@/data/mock-data";
import { shortageData } from "@/data/mock-data";
import { getSmartMatchRecommendation } from "@/app/actions";
import type { SmartMatchRecommendationsOutput } from "@/ai/flows/smart-match-recommendations";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const matchSchema = z.object({
  surplusRegion: z.string().min(1, { message: "Please select a surplus region." }),
  shortageRegion: z.string().min(1, { message: "Please select a shortage region." }),
  commodity: z.string().min(1, { message: "Please select a commodity." }),
  surplusTonnage: z.coerce.number().positive({ message: "Surplus tonnage must be a positive number." }),
  shortageTonnage: z.coerce.number().positive({ message: "Shortage tonnage must be a positive number." }),
});

type MatchFormValues = z.infer<typeof matchSchema>;

export default function MatchMaker() {
  const [recommendation, setRecommendation] = useState<SmartMatchRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      commodity: "rice",
      surplusTonnage: 1000,
      shortageTonnage: 1000,
    },
  });

  async function onSubmit(values: MatchFormValues) {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    const result = await getSmartMatchRecommendation(values);

    if (result.success && result.data) {
      setRecommendation(result.data);
    } else {
      setError(result.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Wand2 className="h-6 w-6 text-primary" />
            Find a Match
          </CardTitle>
          <CardDescription>Use our AI-powered tool to find the optimal match for aid delivery.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="surplusRegion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From (Surplus Region)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a region" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {surplusData.map((d) => (
                            <SelectItem key={d.region} value={d.region}>{d.region}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shortageRegion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To (Shortage Region)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a region" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {shortageData.map((d) => (
                            <SelectItem key={d.region} value={d.region}>{d.region}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="commodity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commodity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a commodity" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="surplusTonnage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surplus Tonnage</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 5000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shortageTonnage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shortage Tonnage</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 5000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</>
                ) : (
                  "Generate Recommendation"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="sticky top-24">
        {isLoading && (
          <Card className="flex flex-col items-center justify-center p-8 h-full min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="font-semibold text-lg">Generating recommendation...</p>
            <p className="text-muted-foreground text-sm">Our AI is analyzing the best routes.</p>
          </Card>
        )}
        {error && (
          <Card className="p-8 text-center text-destructive-foreground bg-destructive">
             <CardTitle>Error</CardTitle>
            <p>{error}</p>
          </Card>
        )}
        {recommendation && (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Sparkles className="h-6 w-6 text-accent" />
                AI Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Route</h3>
                <p className="text-muted-foreground">{form.getValues('surplusRegion')} to {form.getValues('shortageRegion')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Recommendation</h3>
                <p className="text-muted-foreground">{recommendation.recommendation}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Cost Estimate</h3>
                <p className="text-3xl font-bold text-primary">{recommendation.costEstimate}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Feasibility Score</h3>
                <div className="flex items-center gap-2">
                  <Progress value={recommendation.feasibilityScore * 100} className="w-full" />
                  <span className="font-bold text-primary">{(recommendation.feasibilityScore * 100).toFixed(0)}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Fund this Shipment
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
