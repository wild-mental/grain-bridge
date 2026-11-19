
"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreditCard, Heart, PartyPopper } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Dictionary } from "@/i18n/dictionary";

const makeDonationSchema = (d: Dictionary["donation"]) =>
  z.object({
    amount: z.coerce.number().positive({ message: d.errAmountPositive }).min(1, { message: d.errAmountMin }),
    cardName: z.string().min(2, { message: d.errName }),
    cardNumber: z.string().regex(/^\d{16}$/, { message: d.errCard }),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/, { message: d.errExpiry }),
    cvc: z.string().regex(/^\d{3,4}$/, { message: d.errCvc }),
  });

type DonationFormValues = z.infer<ReturnType<typeof makeDonationSchema>>;

export function DonationDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();
  const d = t.donation;
  const donationSchema = useMemo(() => makeDonationSchema(d), [d]);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: undefined,
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  async function onSubmit(data: DonationFormValues) {
    console.log("Processing donation:", data);
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  }
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form and submitted state when dialog closes
      setTimeout(() => {
        form.reset();
        setIsSubmitted(false);
      }, 200); // delay to allow for closing animation
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Heart className="text-primary" /> {d.title}
              </DialogTitle>
              <DialogDescription>
                {d.desc}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{d.amount}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input type="number" placeholder="50.00" className="pl-7" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{d.cardName}</FormLabel>
                      <FormControl>
                        <Input placeholder={d.cardNamePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{d.cardNumber}</FormLabel>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="•••• •••• •••• ••••" className="pl-9" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                         <FormLabel>{d.expiry}</FormLabel>
                        <FormControl>
                          <Input placeholder="MM / YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field }) => (
                      <FormItem>
                         <FormLabel>{d.cvc}</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? d.processing : d.submit}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
              <PartyPopper className="h-16 w-16 text-accent" />
              <DialogTitle className="text-2xl">{d.thanksTitle}</DialogTitle>
              <DialogDescription className="max-w-xs">
                {d.thanksBody}
              </DialogDescription>
              <DialogClose asChild>
                <Button className="mt-4">{d.close}</Button>
              </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
