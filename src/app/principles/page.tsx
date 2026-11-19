"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function PrinciplesPage() {
  const { t } = useLanguage();
  const p = t.principles;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow bg-muted/60 py-16 md:py-24">
        <div className="container max-w-3xl px-4 sm:px-8">
          <SectionHeading align="left" eyebrow={p.eyebrow} title={p.title} body={p.intro} />
          <ol className="mt-10 space-y-4">
            {p.items.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-xl border bg-card p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-success" aria-hidden="true" />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/" className="mt-10 inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {p.back}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
