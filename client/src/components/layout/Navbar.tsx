import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sustainable", label: "Sustainable Development" },
  { href: "/sources", label: "Sources" },
  { href: "/capacity", label: "Capacity Building" },
  { href: "/referral", label: "Referral" },
  { href: "/csr", label: "CSR" },
  { href: "/data", label: "Data" }
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <a className="mr-8 flex items-center space-x-2">
            <span className="font-bold text-xl">Feel Connect</span>
          </a>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a>
                <Button
                  variant={location === item.href ? "default" : "ghost"}
                  className="relative"
                >
                  {item.label}
                  {location === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </Button>
              </a>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="md:hidden"
          size="icon"
        >
          <span className="sr-only">Open menu</span>
          {/* Add mobile menu implementation */}
        </Button>
      </div>
    </nav>
  );
}
