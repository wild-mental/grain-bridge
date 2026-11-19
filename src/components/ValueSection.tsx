"use client";

import Image, { type StaticImageData } from "next/image";
import {
  ArrowRight,
  Camera,
  Check,
  ExternalLink,
  HandHeart,
  Handshake,
  Landmark,
  MapPin,
  Ship,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";

import warehouseBanner from "../../public/images/usaid-warehouse-miami.webp";
import foodAidTruck from "../../public/images/food-aid-truck-haiti.webp";
import mutareWarehouse from "../../public/images/food-warehouse-mutare.webp";
import portSudan from "../../public/images/port-sudan-food-aid-unloading.webp";
import wheatHarvest from "../../public/images/wheat-harvest-indiana.webp";

/** Source pages, in the same order as `t.value.credits.items`. */
const creditLinks = [
  "https://commons.wikimedia.org/wiki/File:A_warehouse_full_of_USAID_goods_-_20110826-FS-LSC-0046_-_Flickr_-_USDAgov.jpg",
  "https://commons.wikimedia.org/wiki/File:Food_Aid_Loaded_for_Distribution_(4322712372).jpg",
  "https://commons.wikimedia.org/wiki/File:Food_in_warehouse_in_Mutare_Zimbabwe_(36273607594).jpg",
  "https://commons.wikimedia.org/wiki/File:Sudan_Port_Sudan_Harbor_USAID2.jpg",
  "https://commons.wikimedia.org/wiki/File:Indiana_Wheat_Harvest_(20210628-NRCS-BJOC-005).jpg",
];

const donorIcons: LucideIcon[] = [MapPin, Truck];

const providerVisuals: { image: StaticImageData; icon: LucideIcon }[] = [
  { image: mutareWarehouse, icon: Warehouse },
  { image: portSudan, icon: Ship },
  { image: wheatHarvest, icon: Landmark },
];

function GroupLabel({ icon: Icon, children, tone }: { icon: LucideIcon; children: React.ReactNode; tone: "primary" | "accent" }) {
  const bg = tone === "primary" ? "bg-primary/10" : "bg-accent/15";
  const iconColor = tone === "primary" ? "text-primary" : "text-accent";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold text-foreground ${bg}`}>
      <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
      {children}
    </span>
  );
}

export default function ValueSection() {
  const { t } = useLanguage();
  const v = t.value;

  return (
    <section aria-labelledby="value-title" className="mb-12 md:mb-20">
      {/* Banner: photo with dark overlay so white text keeps contrast */}
      <div className="relative isolate overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={warehouseBanner}
          alt={v.bannerAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 1400px) 1400px, 100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/75 to-black/45" aria-hidden="true" />
        <div className="px-6 py-12 sm:px-10 md:px-14 md:py-20 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-white/80">{v.eyebrow}</p>
          <h2 id="value-title" className="mt-3 font-headline text-3xl md:text-5xl font-bold leading-tight text-white text-balance">
            {v.title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/90 leading-relaxed">{v.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {v.highlights.map((h) => (
              <li
                key={h}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm"
              >
                <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8">
            <a href="#match-and-donate">
              {v.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      {/* Donors */}
      <div className="mt-12 md:mt-16 overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="grid md:grid-cols-5">
          <div className="relative min-h-[260px] md:col-span-2 md:min-h-full">
            <Image
              src={foodAidTruck}
              alt={v.donors.imageAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 md:col-span-3 md:p-10">
            <GroupLabel icon={HandHeart} tone="primary">{v.donors.label}</GroupLabel>
            <h3 className="mt-4 font-headline text-2xl md:text-3xl font-bold">{v.donors.title}</h3>
            <p className="mt-3 text-muted-foreground">{v.donors.body}</p>
            <ul className="mt-8 space-y-6">
              {v.donors.points.map((point, i) => {
                const Icon = donorIcons[i] ?? Check;
                return (
                  <li key={point.title} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-lg font-bold">{point.title}</p>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{point.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Aid providers */}
      <div className="mt-12 md:mt-16">
        <div className="max-w-3xl">
          <GroupLabel icon={Handshake} tone="accent">{v.providers.label}</GroupLabel>
          <h3 className="mt-4 font-headline text-2xl md:text-3xl font-bold">{v.providers.title}</h3>
          <p className="mt-3 text-muted-foreground">{v.providers.body}</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {v.providers.cards.map((card, i) => {
            const visual = providerVisuals[i];
            const Icon = visual.icon;
            return (
              <article key={card.title} className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="relative aspect-[16/9] overflow-hidden md:aspect-[4/3]">
                  <Image
                    src={visual.image}
                    alt={card.imageAlt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-sm font-bold text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {card.perspective}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h4 className="text-xl font-bold">{card.title}</h4>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{card.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Photo credits */}
      <details className="mt-8 rounded-lg border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        <summary className="flex cursor-pointer items-center gap-2 font-medium text-foreground">
          <Camera className="h-4 w-4" aria-hidden="true" />
          {v.credits.title}
        </summary>
        <p className="mt-3">{v.credits.note}</p>
        <ul className="mt-3 space-y-2">
          {v.credits.items.map((item, i) => (
            <li key={creditLinks[i]}>
              <span className="text-foreground">{item.subject}</span> — {item.author} · {item.license} ·{" "}
              <a
                href={creditLinks[i]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {v.credits.source}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
