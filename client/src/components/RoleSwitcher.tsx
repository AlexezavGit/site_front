import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Heart, Stethoscope, Users, ArrowLeftRight, BadgeCheck } from "lucide-react";

const roles = [
  { id: "donor", label: "Донор", icon: Heart, href: "/portal/donor", color: "text-amber-600" },
  { id: "provider", label: "Надавач", icon: Stethoscope, href: "/portal/provider", color: "text-teal-600" },
  { id: "beneficiary", label: "Бенефіціар", icon: Users, href: "/portal/beneficiary", color: "text-rose-600" },
];

export default function RoleSwitcher() {
  const [location] = useLocation();
  const currentRole = roles.find(r => location.includes(r.href)) || roles[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeftRight className="w-4 h-4" />
          <currentRole.icon className={`w-4 h-4 ${currentRole.color}`} />
          <span className="hidden sm:inline">{currentRole.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Оберіть роль</div>
        {roles.map((role) => (
          <DropdownMenuItem key={role.id} asChild className="gap-2 cursor-pointer">
            <Link href={role.href}>
              <role.icon className={`w-4 h-4 ${role.color}`} />
              {role.label}
              {currentRole.id === role.id && <BadgeCheck className="w-3.5 h-3.5 text-green-500 ml-auto" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
