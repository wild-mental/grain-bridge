
"use client";

import { useState } from "react";
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

const donationSchema = z.object({
  amount: z.coerce.number().positive({ message: "Please enter a positive amount." }).min(1, { message: "Donation must be at least $1." }),
  cardName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Please enter a valid 16-digit card number." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/, { message: "Please use MM/YY format." }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "Please enter a valid CVC." }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export function DonationDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
                <Heart className="text-primary" /> Make a Donation
              </DialogTitle>
              <DialogDescription>
                Your contribution directly funds the logistics to get surplus food to those in need. Every dollar helps bridge the gap.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (USD)</FormLabel>
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
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Card Number</FormLabel>
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
                         <FormLabel>Expiry</FormLabel>
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
                         <FormLabel>CVC</FormLabel>
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
                    {form.formState.isSubmitting ? "Processing..." : "Donate Now"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
              <PartyPopper className="h-16 w-16 text-accent" />
              <DialogTitle className="text-2xl">Thank You!</DialogTitle>
              <DialogDescription className="max-w-xs">
                Your incredible generosity is helping build a world without hunger. Thank you for being a part of GrainBridge.
              </DialogDescription>
              <DialogClose asChild>
                <Button className="mt-4">Close</Button>
              </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
