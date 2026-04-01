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
import { Menu, Shield } from "lucide-react";

const forProfessionals = [
  { href: "/pro", label: "Фахівцям", desc: "Вихід із тіні, цифровий коридор, дохід" },
  { href: "/training", label: "Підвищення кваліфікації", desc: "Сертифікація, Train for Care, потоки" },
];

const forPartners = [
  { href: "/donors", label: "Донорам та КСВ", desc: "Де-ризиковане співфінансування, звітність" },
  { href: "/beneficiaries", label: "Бенефіціарам", desc: "Рівний доступ, ступенева допомога" },
];

const aboutProgram = [
  { href: "/about", label: "Про FEEL Again", desc: "6 розривів, архітектура, місія" },
  { href: "/methodology", label: "Методологія", desc: "Stepped care, VR, клінічні інструменти" },
  { href: "/data", label: "Відкриті дані", desc: "Canonical Dataset, сектор, фінанси" },
];

export default function Navbar() {
  const [location] = useLocation();

  const mobileItems = [
    { href: "/", label: "Головна" },
    { href: "/pro", label: "Фахівцям" },
    { href: "/training", label: "Підвищення кваліфікації" },
    { href: "/donors", label: "Донорам та КСВ" },
    { href: "/beneficiaries", label: "Бенефіціарам" },
    { href: "/about", label: "Про програму" },
    { href: "/methodology", label: "Методологія" },
    { href: "/data", label: "Відкриті дані" },
    { href: "/referral", label: "Реєстрація" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <Link href="/">
          <button className="flex items-center gap-2 font-bold text-lg text-primary hover:opacity-80 transition-opacity shrink-0">
            <Shield className="h-5 w-5" />
            <span>FEEL Again</span>
          </button>
        </Link>

        <div className="hidden md:flex items-center flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(location === "/" ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground")}
                  >
                    Головна
                  </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn("text-sm h-9", (location === "/pro" || location === "/training") ? "bg-primary/10 text-primary" : "text-muted-foreground")}
                >
                  Фахівцям
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-72 p-3">
                    {forProfessionals.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div className="block p-3 rounded-md hover:bg-muted cursor-pointer">
                          <div className="font-medium text-sm mb-1">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn("text-sm h-9", (location === "/donors" || location === "/beneficiaries") ? "bg-primary/10 text-primary" : "text-muted-foreground")}
                >
                  Партнерам
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-72 p-3">
                    {forPartners.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div className="block p-3 rounded-md hover:bg-muted cursor-pointer">
                          <div className="font-medium text-sm mb-1">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn("text-sm h-9", (location === "/about" || location === "/methodology" || location === "/data") ? "bg-primary/10 text-primary" : "text-muted-foreground")}
                >
                  Програма
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-3">
                    {aboutProgram.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div className="block p-3 rounded-md hover:bg-muted cursor-pointer">
                          <div className="font-medium text-sm mb-1">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto hidden md:flex">
          <Link href="/referral">
            <Button size="sm">Реєстрація</Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex items-center gap-2 mb-6 font-bold text-primary">
              <Shield className="h-5 w-5" />
              <span>FEEL Again</span>
            </div>
            <nav className="flex flex-col space-y-1">
              {mobileItems.map((item) => (
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
