import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, ExternalLink } from "lucide-react";
import { FeelAgainLogoInline } from "./FeelAgainLogo";

const NAVY  = "#0F2B46";
const GOLD  = "#D4A017";

const forProfessionals = [
  { href: "/pro",      label: "Фахівцям",              desc: "Вихід із тіні, цифровий коридор, дохід" },
  { href: "/training", label: "Підвищення кваліфікації", desc: "Сертифікація, Train for Care, потоки" },
];
const forPartners = [
  { href: "/donors",       label: "Донорам та КСВ", desc: "Де-ризиковане співфінансування, звітність" },
  { href: "/beneficiaries",label: "Бенефіціарам",   desc: "Рівний доступ, ступенева допомога" },
];
const aboutProgram = [
  { href: "/about",       label: "Про FEEL Again", desc: "6 розривів, архітектура, місія" },
  { href: "/methodology", label: "Методологія",    desc: "Stepped care, VR, клінічні інструменти" },
];

const mobileItems = [
  { href: "/",              label: "Головна" },
  { href: "/pro",           label: "Фахівцям" },
  { href: "/training",      label: "Підвищення кваліфікації" },
  { href: "/donors",        label: "Донорам та КСВ" },
  { href: "/beneficiaries", label: "Бенефіціарам" },
  { href: "/about",         label: "Про програму" },
  { href: "/methodology",   label: "Методологія" },
  { href: "/referral",      label: "Реєстрація" },
];

function DropMenu({ items }: { items: typeof forProfessionals }) {
  return (
    <div className="w-72 p-2 rounded-lg" style={{ background: "#0D2440", border: "1px solid rgba(212,160,23,0.2)" }}>
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <div className="block p-3 rounded-md cursor-pointer transition-colors" style={{ color: "white" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,160,23,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div className="font-medium text-sm mb-0.5">{item.label}</div>
            <div className="text-xs opacity-60">{item.desc}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [location] = useLocation();
  const isActive = (...paths: string[]) => paths.includes(location);

  const navLinkStyle = (active: boolean) => ({
    color: active ? GOLD : "rgba(255,255,255,0.75)",
    background: active ? "rgba(212,160,23,0.12)" : "transparent",
    fontWeight: active ? 500 : 400,
    fontSize: "0.875rem",
    padding: "0.4rem 0.75rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    transition: "color 0.15s, background 0.15s",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  });

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: NAVY,
        borderBottom: `1px solid rgba(212,160,23,0.2)`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="container flex h-16 items-center gap-4">

        {/* ── Logo ──────────────────────────────────── */}
        <Link href="/">
          <button className="shrink-0 hover:opacity-85 transition-opacity">
            <FeelAgainLogoInline variant="dark" />
          </button>
        </Link>

        {/* ── Desktop nav ────────────────────────────── */}
        <div className="hidden md:flex items-center flex-1 ml-2">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">

              <NavigationMenuItem>
                <Link href="/">
                  <button style={navLinkStyle(location === "/")}
                    onMouseEnter={e => { if (location !== "/") (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={e => { if (location !== "/") (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
                  >
                    Головна
                  </button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-sm h-9 rounded-md border-none bg-transparent shadow-none ring-0",
                    "data-[state=open]:bg-transparent",
                    isActive("/pro", "/training") ? "font-medium" : ""
                  )}
                  style={{ color: isActive("/pro", "/training") ? GOLD : "rgba(255,255,255,0.75)" }}
                >
                  Фахівцям
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <DropMenu items={forProfessionals} />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-sm h-9 rounded-md border-none bg-transparent shadow-none ring-0",
                    "data-[state=open]:bg-transparent"
                  )}
                  style={{ color: isActive("/donors", "/beneficiaries") ? GOLD : "rgba(255,255,255,0.75)" }}
                >
                  Партнерам
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <DropMenu items={forPartners} />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-sm h-9 rounded-md border-none bg-transparent shadow-none ring-0",
                    "data-[state=open]:bg-transparent"
                  )}
                  style={{ color: isActive("/about", "/methodology") ? GOLD : "rgba(255,255,255,0.75)" }}
                >
                  Програма
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <DropMenu items={aboutProgram} />
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* External dashboard */}
              <NavigationMenuItem>
                <a
                  href="https://dashboard-1q7.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...navLinkStyle(false), textDecoration: "none" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "white")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)")}
                >
                  Дашборд
                  <ExternalLink style={{ width: 12, height: 12, opacity: 0.6 }} />
                </a>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ── CTA ───────────────────────────────────── */}
        <div className="ml-auto hidden md:flex">
          <Link href="/referral">
            <button
              style={{
                background: GOLD,
                color: NAVY,
                fontWeight: 600,
                fontSize: "0.8125rem",
                padding: "0.45rem 1.1rem",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Реєстрація
            </button>
          </Link>
        </div>

        {/* ── Mobile hamburger ──────────────────────── */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon" style={{ color: "white" }}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0"
            style={{ background: NAVY, borderLeft: `1px solid rgba(212,160,23,0.2)` }}
          >
            <div className="p-5 pb-3 border-b" style={{ borderColor: "rgba(212,160,23,0.15)" }}>
              <FeelAgainLogoInline variant="dark" />
            </div>
            <nav className="flex flex-col p-3 space-y-0.5">
              {mobileItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.625rem 0.75rem",
                      borderRadius: "0.375rem",
                      color: location === item.href ? GOLD : "rgba(255,255,255,0.8)",
                      background: location === item.href ? "rgba(212,160,23,0.12)" : "transparent",
                      fontWeight: location === item.href ? 500 : 400,
                      fontSize: "0.9rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
              <div className="pt-3 border-t" style={{ borderColor: "rgba(212,160,23,0.15)" }}>
                <a
                  href="https://dashboard-1q7.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.625rem 0.75rem",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                  }}
                >
                  Відкрити дашборд <ExternalLink style={{ width: 13, height: 13 }} />
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </nav>
  );
}
