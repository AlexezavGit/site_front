import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Users,
  Clock,
  BarChart3,
  Layers,
  Globe,
  CheckCircle2,
  Circle,
  ArrowDown,
  Target,
  Zap,
  Shield,
} from "lucide-react";

// ── Palette ──────────────────────────────────────────────────────────────────
const BG       = "#0A0F1E";
const CARD_BG  = "#0D1526";
const BORDER   = "rgba(226,232,240,0.08)";
const GREEN    = "#00D68F";
const AMBER    = "#F6AE2D";
const RED      = "#E63946";
const TEXT     = "#E2E8F0";
const MUTED    = "#94A3B8";
const BLUE     = "#3B82F6";

// ── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  color = TEXT,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.6, ease: "easeOut" });
    return controls.stop;
  }, [inView, value, mv]);

  const display = useTransform(mv, (v) =>
    `${prefix}${v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`
  );

  return (
    <motion.span ref={ref} style={{ color, fontFamily: "ui-monospace, monospace" }}>
      {display}
    </motion.span>
  );
}

// ── Section Heading ───────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        color: TEXT,
        fontSize: "1rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderLeft: `3px solid ${AMBER}`,
        paddingLeft: "0.75rem",
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </h2>
  );
}

// ── Bloomberg Metric Card ─────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  animValue,
  decimals = 0,
  prefix = "",
  suffix = "",
  delta,
  deltaPositive,
  subtitle,
  color = TEXT,
  icon: Icon,
}: {
  label: string;
  value: string;
  animValue?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delta?: string;
  deltaPositive?: boolean;
  subtitle?: string;
  color?: string;
  icon: React.ElementType;
}) {
  return (
    <Card
      style={{
        background: CARD_BG,
        border: `1px solid ${BORDER}`,
        borderRadius: "0.5rem",
        padding: "1rem 1.125rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: color,
          opacity: 0.6,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ color: MUTED, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
          {label}
        </div>
        <Icon style={{ width: 14, height: 14, color: MUTED, opacity: 0.5 }} />
      </div>
      <div style={{ marginTop: "0.5rem", fontSize: "1.75rem", fontWeight: 700, fontFamily: "ui-monospace, monospace", lineHeight: 1 }}>
        {animValue !== undefined ? (
          <AnimatedNumber value={animValue} decimals={decimals} prefix={prefix} suffix={suffix} color={color} />
        ) : (
          <span style={{ color }}>{value}</span>
        )}
      </div>
      {delta && (
        <div
          style={{
            marginTop: "0.375rem",
            fontSize: "0.72rem",
            color: deltaPositive ? GREEN : RED,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {delta}
        </div>
      )}
      {subtitle && (
        <div style={{ marginTop: "0.25rem", fontSize: "0.72rem", color: MUTED }}>{subtitle}</div>
      )}
    </Card>
  );
}

// ── Horizontal Bar ────────────────────────────────────────────────────────────
function HorizBar({
  label,
  sublabel,
  fill,
  value,
  color,
  max = 100,
}: {
  label: string;
  sublabel: string;
  fill: number;
  value: string;
  color: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const pct = Math.min((fill / max) * 100, 100);

  return (
    <div ref={ref} style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
        <div>
          <span style={{ color: TEXT, fontSize: "0.82rem", fontWeight: 500 }}>{label}</span>
          <span style={{ color: MUTED, fontSize: "0.72rem", marginLeft: "0.5rem" }}>{sublabel}</span>
        </div>
        <span style={{ color, fontFamily: "ui-monospace, monospace", fontSize: "0.82rem", fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: "4px" }}
        />
      </div>
    </div>
  );
}

// ── Finance Layer Card ────────────────────────────────────────────────────────
function FinanceLayer({
  num,
  title,
  actors,
  volume,
  mechanism,
  color,
  isLast = false,
}: {
  num: number;
  title: string;
  actors: string;
  volume: string;
  mechanism: string;
  color: string;
  isLast?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: "100%",
          background: CARD_BG,
          border: `1px solid ${color}40`,
          borderRadius: "0.5rem",
          padding: "0.875rem 1rem",
          display: "grid",
          gridTemplateColumns: "2rem 1fr auto",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            background: `${color}20`,
            border: `1px solid ${color}60`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
            fontSize: "0.75rem",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {num}
        </div>
        <div>
          <div style={{ color: TEXT, fontSize: "0.85rem", fontWeight: 600 }}>{title}</div>
          <div style={{ color: MUTED, fontSize: "0.72rem", marginTop: "0.1rem" }}>{actors}</div>
          <div style={{ color: MUTED, fontSize: "0.7rem", marginTop: "0.15rem", fontStyle: "italic" }}>{mechanism}</div>
        </div>
        <div style={{ color, fontFamily: "ui-monospace, monospace", fontSize: "0.8rem", fontWeight: 700, textAlign: "right", whiteSpace: "nowrap" }}>
          {volume}
        </div>
      </div>
      {!isLast && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0.2rem 0" }}>
          <div style={{ width: "1px", height: "14px", background: BORDER }} />
          <ArrowDown style={{ width: 14, height: 14, color: MUTED, opacity: 0.4 }} />
          <div style={{ width: "1px", height: "6px", background: BORDER }} />
        </div>
      )}
    </div>
  );
}

// ── Compliance Row ────────────────────────────────────────────────────────────
function ComplianceRow({
  commitment,
  sector,
  ukraine,
  feelAgain,
}: {
  commitment: string;
  sector: string;
  ukraine: string;
  feelAgain: string;
}) {
  return (
    <tr
      style={{
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <td style={{ padding: "0.625rem 0.75rem", color: TEXT, fontSize: "0.82rem", fontWeight: 500 }}>{commitment}</td>
      <td style={{ padding: "0.625rem 0.75rem", color: RED, fontSize: "0.78rem", fontFamily: "ui-monospace, monospace" }}>{sector}</td>
      <td style={{ padding: "0.625rem 0.75rem", color: AMBER, fontSize: "0.78rem", fontFamily: "ui-monospace, monospace" }}>{ukraine}</td>
      <td style={{ padding: "0.625rem 0.75rem", color: GREEN, fontSize: "0.78rem", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>{feelAgain}</td>
    </tr>
  );
}

// ── Integration Status Card ───────────────────────────────────────────────────
function IntegrationCard({ name, status }: { name: string; status: "active" | "design" }) {
  const isActive = status === "active";
  return (
    <div
      style={{
        background: CARD_BG,
        border: `1px solid ${isActive ? GREEN + "40" : AMBER + "30"}`,
        borderRadius: "0.5rem",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: isActive ? GREEN : AMBER,
          boxShadow: `0 0 6px ${isActive ? GREEN : AMBER}`,
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ color: TEXT, fontSize: "0.82rem", fontWeight: 500 }}>{name}</div>
        <div style={{ color: isActive ? GREEN : AMBER, fontSize: "0.68rem", marginTop: "0.1rem" }}>
          {isActive ? "Active" : "In design"}
        </div>
      </div>
    </div>
  );
}

// ── Roadmap Phase ─────────────────────────────────────────────────────────────
function RoadmapPhase({
  phase,
  name,
  period,
  items,
  color,
  active,
}: {
  phase: number;
  name: string;
  period: string;
  items: string[];
  color: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        flex: 1,
        background: CARD_BG,
        border: `1px solid ${active ? color + "80" : BORDER}`,
        borderRadius: "0.5rem",
        padding: "1rem",
        position: "relative",
      }}
    >
      {active && (
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: 0,
            right: 0,
            height: "3px",
            background: color,
            borderRadius: "0.5rem 0.5rem 0 0",
          }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <div
          style={{
            background: `${color}20`,
            border: `1px solid ${color}60`,
            color,
            fontSize: "0.65rem",
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            padding: "0.15rem 0.5rem",
            borderRadius: "9999px",
            letterSpacing: "0.06em",
          }}
        >
          PHASE {phase}
        </div>
        {active && (
          <Badge style={{ background: `${color}20`, color, border: `1px solid ${color}40`, fontSize: "0.6rem" }}>
            CURRENT
          </Badge>
        )}
      </div>
      <div style={{ color: TEXT, fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.15rem" }}>{name}</div>
      <div style={{ color: MUTED, fontSize: "0.72rem", marginBottom: "0.75rem", fontFamily: "ui-monospace, monospace" }}>{period}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.375rem" }}>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: color, marginTop: "0.45rem", flexShrink: 0 }} />
            <span style={{ color: MUTED, fontSize: "0.75rem" }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Quote Block ───────────────────────────────────────────────────────────────
function QuoteBlock({ text, index }: { text: string; index: number }) {
  const colors = [GREEN, BLUE, AMBER, GREEN];
  const color = colors[index % colors.length];
  return (
    <div
      style={{
        background: CARD_BG,
        border: `1px solid ${BORDER}`,
        borderLeft: `3px solid ${color}`,
        borderRadius: "0 0.5rem 0.5rem 0",
        padding: "1.25rem 1.5rem",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0.75rem",
          left: "1.25rem",
          fontSize: "3rem",
          color: `${color}20`,
          lineHeight: 1,
          fontFamily: "Georgia, serif",
          userSelect: "none",
        }}
      >
        "
      </div>
      <p style={{ color: TEXT, fontSize: "0.875rem", lineHeight: 1.7, margin: 0, paddingLeft: "1.5rem" }}>{text}</p>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function InstitutionalDashboard() {
  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, sans-serif",
        color: TEXT,
      }}
    >
      {/* ── SECTION 1: HEADER BAR ──────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "#060A14",
          borderBottom: `1px solid ${BORDER}`,
          padding: "0 1.5rem",
          height: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              color: TEXT,
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            FEEL Again ·{" "}
            <span style={{ color: MUTED, fontWeight: 400 }}>Institutional Intelligence Dashboard</span>
          </span>
          <Badge
            style={{
              background: "rgba(230,57,70,0.15)",
              color: RED,
              border: `1px solid ${RED}40`,
              fontSize: "0.6rem",
              letterSpacing: "0.06em",
              padding: "0.15rem 0.5rem",
            }}
          >
            CONFIDENTIAL — INTERNAL USE
          </Badge>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: GREEN,
              boxShadow: `0 0 6px ${GREEN}`,
            }}
          />
          <span style={{ color: MUTED, fontSize: "0.72rem", fontFamily: "ui-monospace, monospace" }}>
            Live · Kyiv 09 Jul 2026 21:34:17
          </span>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* ── SECTION 2: BLOOMBERG METRICS ROW ───────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Key Performance Indicators</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: "0.75rem",
            }}
          >
            <MetricCard
              label="HCI — Humanitarian Composite Index"
              value="0.73"
              animValue={0.73}
              decimals={2}
              delta="↑ +0.04 vs Q1"
              deltaPositive
              subtitle="Platform readiness score"
              color={GREEN}
              icon={TrendingUp}
            />
            <MetricCard
              label="Total Need"
              value="9.6M"
              animValue={9.6}
              decimals={1}
              suffix="M"
              delta="WHO SIMH 2024"
              subtitle="Cases requiring support"
              color={RED}
              icon={Users}
            />
            <MetricCard
              label="Specialist Care Needed"
              value="3.9M"
              animValue={3.9}
              decimals={1}
              suffix="M"
              delta="Low-intensity 12–20h/WHO"
              subtitle="Addressable by FEEL Again"
              color={AMBER}
              icon={Target}
            />
            <MetricCard
              label="Sector Hours/Sessions Gap"
              value="47–78M"
              subtitle="Hours/sessions total volume needed"
              color={TEXT}
              icon={Clock}
            />
            <MetricCard
              label="Cost to State"
              value="$0.00"
              animValue={0}
              decimals={2}
              prefix="$"
              delta="Platform self-funded"
              subtitle="7%→3.5% transaction fee"
              color={GREEN}
              icon={DollarSign}
            />
            <MetricCard
              label="ROI per €1 Invested"
              value="€4.3"
              animValue={4.3}
              decimals={1}
              prefix="€"
              delta="Conservative $3–10 per $1"
              subtitle="Socio-economic return"
              color={GREEN}
              icon={BarChart3}
            />
          </div>
        </div>

        {/* ── SECTION 3: COST OF INACTION FUNNEL ─────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Вартість бездіяльності — Cost of Inaction</SectionTitle>
          <Card style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: "0.5rem", padding: "1.25rem 1.5rem" }}>
            <HorizBar
              label="OECD Annual Mental Health Burden"
              sublabel="EU-27"
              fill={100}
              value="€600B"
              color={RED}
            />
            <HorizBar
              label="Ukraine Estimated Annual Economic Burden"
              sublabel="GDP impact ~2021 unreported"
              fill={1.33}
              value="~$8B"
              color={RED}
              max={100}
            />
            <HorizBar
              label="Addressable via FEEL Again"
              sublabel="50M hours × $70 avg"
              fill={83}
              value="$2.5B–$4.5B"
              color={AMBER}
            />
            <HorizBar
              label="Current Mobilized Humanitarian MHPSS"
              sublabel="WHO + OCHA pool / yr"
              fill={8}
              value="~$400M/yr"
              color={BLUE}
            />
            <HorizBar
              label="Localization Rate — Grand Bargain"
              sublabel="Ukraine 7–8% vs 25% target"
              fill={7.5}
              value="7–8%"
              color={AMBER}
            />
            <HorizBar
              label="Quality-Funded MHPSS"
              sublabel="vs 30% target"
              fill={12}
              value="<12%"
              color={AMBER}
            />
          </Card>
        </div>

        {/* ── SECTION 4: BLENDED FINANCE FLOW ────────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Blended Finance Stack — Multi-Layer Co-Financing</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0" }}>
            {[
              {
                num: 1,
                title: "STATE / NHSU",
                actors: "Ministry of Health Ukraine, NHSU Healthcare Reform Budget",
                volume: "State budget + EU MFP",
                mechanism: "PforR — results-based disbursement via eHealth registry",
                color: BLUE,
              },
              {
                num: 2,
                title: "INTERNATIONAL HUMANITARIAN",
                actors: "OCHA, UNHCR, WHO, UNICEF — MHPSS pooled funds",
                volume: "~$400M/yr",
                mechanism: "IATI-compliant, OCHA FTS integration, Grand Bargain accountability",
                color: "#7C3AED",
              },
              {
                num: 3,
                title: "CORPORATE / ESG",
                actors: "SoftServe, Banking HCR Charter, Employer EAP programs",
                volume: "~$50M est.",
                mechanism: "Employer-funded vouchers, ESG reporting, ZSU contractor programs",
                color: AMBER,
              },
              {
                num: 4,
                title: "SIB / IMPACT INVESTORS",
                actors: "EBRD, IFC, Social Impact Bond structures",
                volume: "2.3× ROI target",
                mechanism: "EBRD 60% first-loss guarantee; outcome payment at ≥85% completion",
                color: GREEN,
              },
              {
                num: 5,
                title: "P2P / CROWDFUNDING",
                actors: "Community Bankas, monobank charity model, diaspora networks",
                volume: "100K accounts 2025",
                mechanism: "Micro-donations → direct escrow → verified beneficiary unlock",
                color: RED,
                isLast: true,
              },
            ].map((layer) => (
              <FinanceLayer key={layer.num} {...(layer as any)} />
            ))}
          </div>
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              background: `${GREEN}10`,
              border: `1px solid ${GREEN}30`,
              borderRadius: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: MUTED, fontSize: "0.78rem" }}>Total Addressable Infrastructure Target</span>
            <span style={{ color: GREEN, fontFamily: "ui-monospace, monospace", fontWeight: 700, fontSize: "1rem" }}>
              $2.5B – $4.5B
            </span>
          </div>
        </div>

        {/* ── SECTION 5: GRAND BARGAIN COMPLIANCE TABLE ───────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Grand Bargain 3.0 Compliance — FEEL Again vs Sector</SectionTitle>
          <Card style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: "0.5rem", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}>
                    {["Commitment", "Sector Avg", "Ukraine", "FEEL Again Target"].map((h, i) => (
                      <th
                        key={h}
                        style={{
                          padding: "0.625rem 0.75rem",
                          textAlign: "left",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: i === 0 ? MUTED : i === 1 ? RED : i === 2 ? AMBER : GREEN,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ComplianceRow
                    commitment="Localization"
                    sector="1.2% global"
                    ukraine="7–8% UA"
                    feelAgain="100% direct-to-provider"
                  />
                  <ComplianceRow
                    commitment="Quality Funding"
                    sector="<12%"
                    ukraine="—"
                    feelAgain="93%+ (PforR escrow)"
                  />
                  <ComplianceRow
                    commitment="AAP — Accountability to Affected Populations"
                    sector="~15%"
                    ukraine="—"
                    feelAgain="Built-in (informed consent + feedback)"
                  />
                  <ComplianceRow
                    commitment="Overhead"
                    sector=">30% avg"
                    ukraine="—"
                    feelAgain="≤8% (platform fee 7%→3.5%)"
                  />
                  <ComplianceRow
                    commitment="Outcome Reporting"
                    sector="Ad hoc"
                    ukraine="—"
                    feelAgain="Parametric automated"
                  />
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* ── SECTION 6: INTEGRATION RADAR ────────────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Digital Interoperability Stack</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            <IntegrationCard name="eHealth (Ukraine MOH)" status="design" />
            <IntegrationCard name="Helsi (15M+ users)" status="design" />
            <IntegrationCard name="WHO DHIS2" status="design" />
            <IntegrationCard name="OCHA FTS" status="design" />
            <IntegrationCard name="IATI Registry" status="design" />
            <IntegrationCard name="Solana / Qouroom GB" status="active" />
            <IntegrationCard name="Bank ID Ukraine" status="active" />
            <IntegrationCard name="Дія.ID" status="active" />
          </div>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
              <span style={{ color: MUTED, fontSize: "0.72rem" }}>Active</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: AMBER, boxShadow: `0 0 6px ${AMBER}` }} />
              <span style={{ color: MUTED, fontSize: "0.72rem" }}>In design</span>
            </div>
          </div>
        </div>

        {/* ── SECTION 7: ROADMAP PHASES ────────────────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Deployment Roadmap</SectionTitle>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <RoadmapPhase
              phase={1}
              name="RAILS"
              period="Q3–Q4 2026"
              color={GREEN}
              active
              items={[
                "Core payment infrastructure",
                "3 pilot cities: Kyiv / Kharkiv / Odesa",
                "500 beneficiaries onboarded",
                "eHealth API integration",
                "Дія.ID + SBT token issuance",
                "PforR escrow logic live",
              ]}
            />
            <RoadmapPhase
              phase={2}
              name="LOCOMOTIVE"
              period="2027"
              color={AMBER}
              items={[
                "50,000 beneficiaries",
                "SIB tranche 2 activation",
                "EBRD 60% guarantee live",
                "5,000 providers onboarded",
                "WHO DHIS2 data sync",
                "OCHA FTS reporting automated",
              ]}
            />
            <RoadmapPhase
              phase={3}
              name="NETWORK"
              period="2028+"
              color={BLUE}
              items={[
                "3.9M addressable population",
                "National MHPSS payment infrastructure",
                "EU replication model published",
                "SIB full exit / reinvestment cycle",
                "Open-source protocol release",
              ]}
            />
          </div>
          {/* Timeline connector */}
          <div style={{ marginTop: "1rem", position: "relative", height: "4px", background: BORDER, borderRadius: "2px" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              style={{ height: "100%", background: GREEN, borderRadius: "2px" }}
            />
            <div style={{ position: "absolute", top: "50%", left: "33%", transform: "translate(-50%, -50%)", width: "10px", height: "10px", borderRadius: "50%", background: GREEN, border: `2px solid ${BG}` }} />
            <div style={{ position: "absolute", top: "50%", left: "66%", transform: "translate(-50%, -50%)", width: "10px", height: "10px", borderRadius: "50%", background: AMBER, border: `2px solid ${BG}` }} />
            <div style={{ position: "absolute", top: "50%", left: "100%", transform: "translate(-50%, -50%)", width: "10px", height: "10px", borderRadius: "50%", background: BLUE, border: `2px solid ${BG}` }} />
          </div>
        </div>

        {/* ── SECTION 8: EXECUTIVE SUMMARY ────────────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Executive Summary — For Print / Export</SectionTitle>
          <div
            style={{
              padding: "0.75rem 1rem",
              background: `${GREEN}08`,
              border: `1px solid ${GREEN}20`,
              borderRadius: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ color: GREEN, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em" }}>
              FEEL Again = Payment Infrastructure for the MHPSS Sector
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem" }}>
            <QuoteBlock
              index={0}
              text="Digital Accountability Infrastructure for Mental Health — rails on which existing aid finally reaches the recipient without losses."
            />
            <QuoteBlock
              index={1}
              text="Cost to State: $0.00 — platform sustains itself through 7%→3.5% transaction fee model, eliminating budget dependency."
            />
            <QuoteBlock
              index={2}
              text="EMDR + VR Bravemind: WHO first-line protocol. 8–12 sessions. ≥90% completion. €1 → €4.3 socio-economic ROI (Simpson 2025)."
            />
            <QuoteBlock
              index={3}
              text="Grand Bargain localization at 100% — direct psychologist payments, eliminating intermediary overhead to ≤8% total platform fee."
            />
          </div>
        </div>

        {/* ── ADDITIONAL STATS ROW ─────────────────────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Clinical Protocol Benchmarks</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              { label: "EMDR Sessions (WHO protocol)", value: "8–12", note: "First-line PTSD treatment", color: GREEN },
              { label: "BRAVEMIND VA Centers (USA)", value: "170+", note: "≥90% completion rate", color: GREEN },
              { label: "PE/CPT Completion vs EMDR", value: "<28%", note: "EMDR retention significantly higher", color: RED },
              { label: "Unserved VPO (WHO SIMH 2024)", value: "74%", note: "Do not receive any help", color: RED },
              { label: "Anti-Burnout Session Ceiling", value: "4.5/day", note: "Amber alert at ≥4 sessions", color: AMBER },
              { label: "Crisis SLA — Suicide Ideation", value: "<5 min", note: "Urgent response protocol", color: RED },
              { label: "OECD: Mental Health vs GDP", value: ">4%", note: "€600B EU-27 annual cost", color: AMBER },
              { label: "Specialists Needed (≥1000h/yr)", value: "50–80K", note: "Sector capacity gap", color: AMBER },
            ].map(({ label, value, note, color }) => (
              <div
                key={label}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "0.5rem",
                  padding: "0.875rem 1rem",
                }}
              >
                <div style={{ color: MUTED, fontSize: "0.68rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                  {label}
                </div>
                <div style={{ color, fontFamily: "ui-monospace, monospace", fontSize: "1.35rem", fontWeight: 700 }}>{value}</div>
                <div style={{ color: MUTED, fontSize: "0.7rem", marginTop: "0.2rem" }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PSYCHOLOGIST RATE TIERS ──────────────────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Provider Rate Architecture</SectionTitle>
          <Card style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: "0.5rem", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}>
                    {["Tier", "Level", "Rate / Session", "Notes"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "0.625rem 0.75rem",
                          textAlign: "left",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: MUTED,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tier: "L0", level: "Basic / Trained Peer", rate: "€18/hr", note: "Stepped care entry tier", color: MUTED },
                    { tier: "L1", level: "Licensed Psychologist", rate: "€35/hr", note: "Standard outpatient", color: TEXT },
                    { tier: "L2", level: "Specialist / Supervisor", rate: "€55/hr", note: "Complex trauma, EMDR certified", color: AMBER },
                    { tier: "L3", level: "Expert / Clinical Lead", rate: "€85/hr", note: "VR Bravemind, research protocols", color: GREEN },
                  ].map(({ tier, level, rate, note, color }) => (
                    <tr key={tier} style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <td style={{ padding: "0.625rem 0.75rem", color: AMBER, fontSize: "0.8rem", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>{tier}</td>
                      <td style={{ padding: "0.625rem 0.75rem", color: TEXT, fontSize: "0.82rem" }}>{level}</td>
                      <td style={{ padding: "0.625rem 0.75rem", color, fontFamily: "ui-monospace, monospace", fontSize: "0.85rem", fontWeight: 700 }}>{rate}</td>
                      <td style={{ padding: "0.625rem 0.75rem", color: MUTED, fontSize: "0.75rem" }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* ── BUDGET CONCEPT ───────────────────────────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>Budget Concept — €9M Total Programme</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "0.75rem" }}>
            {[
              { label: "VR Equipment", pct: 20, value: "€1.8M", color: BLUE },
              { label: "Cash-back / Vouchers", pct: 25, value: "€2.25M", color: GREEN },
              { label: "Capacity Building", pct: 18, value: "€1.62M", color: AMBER },
              { label: "Operations", pct: 12, value: "€1.08M", color: TEXT },
              { label: "Overhead", pct: 8, value: "≤€720K", color: MUTED },
            ].map(({ label, pct, value, color }) => (
              <div
                key={label}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "0.5rem",
                  padding: "0.875rem 1rem",
                }}
              >
                <div style={{ color: MUTED, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                  {label}
                </div>
                <div style={{ color, fontFamily: "ui-monospace, monospace", fontSize: "1.25rem", fontWeight: 700 }}>{value}</div>
                <div style={{ marginTop: "0.5rem", height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: "2px" }} />
                </div>
                <div style={{ color: MUTED, fontFamily: "ui-monospace, monospace", fontSize: "0.7rem", marginTop: "0.25rem" }}>{pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5-STEP BENEFICIARY JOURNEY ────────────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle>5-Step Beneficiary Journey</SectionTitle>
          <div style={{ display: "flex", gap: "0", overflowX: "auto" }}>
            {[
              { step: 1, name: "Contact", detail: "Дія.ID / Referral intake", color: BLUE },
              { step: 2, name: "Diagnosis", detail: "PCL-5 · PHQ-9 · GAD-7", color: AMBER },
              { step: 3, name: "Matching", detail: "PsyUber algorithm", color: GREEN },
              { step: 4, name: "Therapy", detail: "GPS-verified sessions, escrow", color: GREEN },
              { step: 5, name: "Follow-up", detail: "PforR release + PCL-5 rescore", color: BLUE },
            ].map(({ step, name, detail, color }, i, arr) => (
              <div key={step} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: "120px" }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div
                    style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "50%",
                      background: `${color}20`,
                      border: `2px solid ${color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.5rem",
                      color,
                      fontWeight: 700,
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "0.8rem",
                    }}
                  >
                    {step}
                  </div>
                  <div style={{ color: TEXT, fontSize: "0.78rem", fontWeight: 600 }}>{name}</div>
                  <div style={{ color: MUTED, fontSize: "0.68rem", marginTop: "0.15rem" }}>{detail}</div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: "1.5rem", flexShrink: 0, display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "100%", height: "1px", background: BORDER }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <div
          style={{
            borderTop: `1px solid ${BORDER}`,
            paddingTop: "1.25rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ color: MUTED, fontSize: "0.68rem", lineHeight: 1.7, maxWidth: "800px" }}>
            <span style={{ color: TEXT, fontWeight: 500 }}>Sources: </span>
            WHO SIMH 2024 · OECD 2018/2021 · IASC/ALNAP Grand Bargain 3.0 · EBRD Impact Finance Framework · Simpson 2025 (British Journal of Psychology) · Difede/Rothbaum/Rizzo 2022 (BRAVEMIND RCT) · Najavits 2015 (PMC)
          </div>
          <div style={{ color: MUTED, fontSize: "0.68rem", fontFamily: "ui-monospace, monospace" }}>
            FEEL Again v2.1 · Ecosystem Audit
          </div>
        </div>
      </div>
    </div>
  );
}
