import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Shield } from "lucide-react";

const navItems = [
  { href: "/", label: "Головна" },
  { href: "/crisis", label: "Криза" },
  { href: "/architecture", label: "Архітектура" },
  { href: "/for-partners", label: "Партнерам" },
  { href: "/open-data", label: "Відкриті Дані" },
  { href: "/methodology", label: "Методологія" },
  { href: "/documents", label: "Документи" },
  { href: "/referral", label: "Реєстрація" },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-6">
        <Link href="/">
          <button className="flex items-center gap-2 mr-2 font-bold text-lg text-primary hover:opacity-80 transition-opacity">
            <Shield className="h-5 w-5" />
            <span>FEEL Again</span>
          </button>
        </Link>

        <Badge variant="outline" className="hidden lg:flex text-xs text-muted-foreground border-amber-300 bg-amber-50">
          v0.3 · Внутрішній портал
        </Badge>

        <div className="hidden md:flex items-center space-x-1 ml-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-sm",
                  location === item.href
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex items-center gap-2 mb-6 font-bold text-primary">
              <Shield className="h-5 w-5" />
              <span>FEEL Again</span>
              <Badge variant="outline" className="text-xs ml-auto">v0.3</Badge>
            </div>
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "default" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
