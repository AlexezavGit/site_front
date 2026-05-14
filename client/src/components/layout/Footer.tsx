import { Link } from "wouter";
import { FeelAgainLogoInline } from "./FeelAgainLogo";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

export default function Footer() {
  return (
    <footer style={{ background: NAVY, color: "white", borderTop: `1px solid rgba(212,160,23,0.18)` }}>
      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="mb-4">
              <FeelAgainLogoInline variant="dark" />
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
              Цифрова інфраструктура гуманітарної координації MHPSS в Україні.
            </p>
            <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              Не платформа. Не стартап.<br />
              Інституційна інфраструктура для кризи.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: GOLD }}>Для учасників</h4>
            <ul className="space-y-2">
              {[
                { href: "/pro", label: "Фахівцям" },
                { href: "/training", label: "Підвищення кваліфікації" },
                { href: "/beneficiaries", label: "Бенефіціарам" },
                { href: "/referral", label: "Реєстрація" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: GOLD }}>Партнерам</h4>
            <ul className="space-y-2">
              {[
                { href: "/donors", label: "Донорам та КСВ" },
                { href: "/about", label: "Про програму" },
                { href: "/methodology", label: "Методологія" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://dashboard-1q7.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Аналітичний дашборд
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: GOLD }}>Контакт</h4>
            <address className="not-italic text-sm space-y-1" style={{ color: "rgba(255,255,255,0.7)" }}>
              <p>info@feelagain.org</p>
              <p>Київ, Україна</p>
              <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                Усі кількісні дані — Doc 4, Canonical Dataset v1.0
              </p>
            </address>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ borderTop: "1px solid rgba(212,160,23,0.12)", color: "rgba(255,255,255,0.45)" }}>
          <p>&copy; {new Date().getFullYear()} FEEL Again Programme Consortium.</p>
          <p>$1,945K · 3 кластери · 12 проєктів · 7% → 3%</p>
        </div>
      </div>
    </footer>
  );
}
