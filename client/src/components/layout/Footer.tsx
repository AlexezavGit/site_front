import { Link } from "wouter";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-white">
      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="font-bold text-lg">FEEL Again</span>
            </div>
            <p className="text-sm text-slate-400 mb-3">
              Цифрова інфраструктура гуманітарної координації MHPSS в Україні.
            </p>
            <p className="text-xs text-slate-500">
              Не платформа. Не стартап.<br />
              Фінансові рейки для сектору.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Для учасників</h4>
            <ul className="space-y-2">
              {[
                { href: "/pro", label: "Фахівцям" },
                { href: "/training", label: "Підвищення кваліфікації" },
                { href: "/beneficiaries", label: "Бенефіціарам" },
                { href: "/referral", label: "Реєстрація" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Партнерам</h4>
            <ul className="space-y-2">
              {[
                { href: "/donors", label: "Донорам та КСВ" },
                { href: "/about", label: "Про програму" },
                { href: "/methodology", label: "Методологія" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://dashboard-1q7.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">
                  📊 Дашборд даних
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Контакт</h4>
            <address className="not-italic text-sm text-slate-400 space-y-1">
              <p>info@feelagain.org</p>
              <p>Київ, Україна</p>
              <p className="text-xs text-slate-500 mt-3">
                Програма FEEL Again консорціум.<br />
                Усі кількісні дані — Doc 4, Canonical Dataset v1.0
              </p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} FEEL Again Programme Consortium. Усі права захищені.</p>
          <p>$1,945K · 3 кластери · 12 проєктів · Вартість для держави: $0.00</p>
        </div>
      </div>
    </footer>
  );
}
