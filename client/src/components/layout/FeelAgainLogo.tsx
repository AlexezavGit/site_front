interface Props {
  variant?: "dark" | "light";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const GOLD = "#D4A017";
const NAVY = "#0F2B46";

export function FeelAgainLogo({ variant = "dark", size = "md", className = "" }: Props) {
  const primary = variant === "dark" ? "#FFFFFF" : NAVY;

  const cfg = {
    xs: { markW: 34, markH: 26, textSize: 7.5, gap: 4, ls: "0.38em" },
    sm: { markW: 46, markH: 36, textSize: 9.5, gap: 5, ls: "0.40em" },
    md: { markW: 60, markH: 46, textSize: 12, gap: 6, ls: "0.42em" },
    lg: { markW: 88, markH: 68, textSize: 17, gap: 8, ls: "0.44em" },
  }[size];

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
      style={{ lineHeight: 1 }}
    >
      <svg
        viewBox="0 0 70 56"
        width={cfg.markW}
        height={cfg.markH}
        style={{ overflow: "visible" }}
      >
        {/*
          Layout: each letter-glyph is 22px wide, step = 16px (overlap ≈ 27%)
          F  at x=0,  E(gold) at x=16,  E(55%) at x=32,  L(30%) at x=48
          Total width ≈ 48+22 = 70px, height 56px
          Vertical stroke: 5px wide, 56px tall
          Bar thickness: 5px
          Bars:
            F → top(0) + mid(24)           [no bottom]
            E → top(0) + mid(24) + bot(51) [3 bars]
            E → top(0) + mid(24) + bot(51)
            L → bot only (51)              [no top/mid]
        */}

        {/* ── F  (full white/navy) ───────────────────────── */}
        <g>
          <rect x="0"  y="0"  width="5"  height="56" fill={primary} />
          <rect x="0"  y="0"  width="22" height="5"  fill={primary} />
          <rect x="0"  y="24" width="16" height="5"  fill={primary} />
        </g>

        {/* ── E1  (gold, 100%) ──────────────────────────── */}
        <g transform="translate(16,0)">
          <rect x="0" y="0"  width="5"  height="56" fill={GOLD} />
          <rect x="0" y="0"  width="22" height="5"  fill={GOLD} />
          <rect x="0" y="24" width="16" height="5"  fill={GOLD} />
          <rect x="0" y="51" width="22" height="5"  fill={GOLD} />
        </g>

        {/* ── E2  (white/navy @ 55%) ───────────────────── */}
        <g transform="translate(32,0)" opacity="0.55">
          <rect x="0" y="0"  width="5"  height="56" fill={primary} />
          <rect x="0" y="0"  width="22" height="5"  fill={primary} />
          <rect x="0" y="24" width="16" height="5"  fill={primary} />
          <rect x="0" y="51" width="22" height="5"  fill={primary} />
        </g>

        {/* ── L   (white/navy @ 30%) ───────────────────── */}
        <g transform="translate(48,0)" opacity="0.30">
          <rect x="0" y="0"  width="5"  height="56" fill={primary} />
          <rect x="0" y="51" width="22" height="5"  fill={primary} />
        </g>
      </svg>

      {/* "Again" — gold, wide letter-spacing, light weight */}
      <span
        style={{
          color: GOLD,
          fontSize: cfg.textSize,
          fontWeight: 300,
          letterSpacing: cfg.ls,
          textTransform: "uppercase",
          marginTop: cfg.gap,
          display: "block",
          paddingLeft: cfg.ls,
        }}
      >
        Again
      </span>
    </div>
  );
}

/**
 * Inline / navbar compact variant  — mark + "FEEL Again" on one line
 */
export function FeelAgainLogoInline({ variant = "dark", className = "" }: Pick<Props, "variant" | "className">) {
  const primary = variant === "dark" ? "#FFFFFF" : NAVY;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg viewBox="0 0 70 56" width="28" height="22" style={{ overflow: "visible", flexShrink: 0 }}>
        <g>
          <rect x="0"  y="0"  width="5"  height="56" fill={primary} />
          <rect x="0"  y="0"  width="22" height="5"  fill={primary} />
          <rect x="0"  y="24" width="16" height="5"  fill={primary} />
        </g>
        <g transform="translate(16,0)">
          <rect x="0" y="0"  width="5"  height="56" fill={GOLD} />
          <rect x="0" y="0"  width="22" height="5"  fill={GOLD} />
          <rect x="0" y="24" width="16" height="5"  fill={GOLD} />
          <rect x="0" y="51" width="22" height="5"  fill={GOLD} />
        </g>
        <g transform="translate(32,0)" opacity="0.55">
          <rect x="0" y="0"  width="5"  height="56" fill={primary} />
          <rect x="0" y="0"  width="22" height="5"  fill={primary} />
          <rect x="0" y="24" width="16" height="5"  fill={primary} />
          <rect x="0" y="51" width="22" height="5"  fill={primary} />
        </g>
        <g transform="translate(48,0)" opacity="0.30">
          <rect x="0" y="0"  width="5"  height="56" fill={primary} />
          <rect x="0" y="51" width="22" height="5"  fill={primary} />
        </g>
      </svg>

      <span
        style={{
          fontWeight: 300,
          fontSize: "1.1rem",
          letterSpacing: "0.05em",
          color: primary,
          display: "flex",
          alignItems: "baseline",
          gap: "0.25em",
        }}
      >
        <span>FEEL</span>
        <span style={{ color: GOLD }}>Again</span>
      </span>
    </div>
  );
}
