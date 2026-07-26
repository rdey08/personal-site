// Architecture sketch for the NPP research write-up, registered in
// mdx-components so content/research/npp-lstm.mdx can place it. It lives as
// TSX rather than inline MDX because MDX parses multi-line text inside JSX
// as markdown blocks: labels ended up wrapped in <p> (invalid inside <svg>,
// hydration mismatch) and expression children in flow position were dropped
// entirely by the MDX pipeline. Plain TSX has neither problem, is
// typechecked, and prettier formats it without changing its meaning.

const INPUTS = [
  { label: "Satellite", y: 45 },
  { label: "Precipitation", y: 115 },
  { label: "Cattle GPS", y: 185 },
  { label: "Land cover", y: 255 },
];

// Encoder outputs converge on the fusion block's left edge.
const FUSION_Y = [138, 146, 154, 162];

export function NppArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 680 300"
      role="img"
      aria-labelledby="fig-npp-title"
      style={{ width: "100%", height: "auto" }}
    >
      <title id="fig-npp-title">
        Multi-branch LSTM architecture: four input modalities, one temporal
        encoder each, fused late into a single NPP prediction.
      </title>
      <defs>
        <marker
          id="arr-npp"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L8 4L0 8z" fill="var(--ink-faint)" />
        </marker>
      </defs>

      {INPUTS.map(({ label, y }, i) => (
        <g key={label}>
          {/* input modality */}
          <text
            x="120"
            y={y + 4}
            textAnchor="end"
            fontSize="14"
            fill="var(--ink)"
          >
            {label}
          </text>
          {/* input → encoder */}
          <line
            x1="130"
            y1={y}
            x2="162"
            y2={y}
            stroke="var(--ink-faint)"
            markerEnd="url(#arr-npp)"
          />
          {/* per-modality LSTM encoder */}
          <rect
            x="170"
            y={y - 20}
            width="150"
            height="40"
            rx="4"
            fill="var(--paper-sunken)"
            stroke="var(--line-strong)"
          />
          <text
            x="245"
            y={y + 4}
            textAnchor="middle"
            fontSize="14"
            fill="var(--ink)"
          >
            LSTM encoder
          </text>
          {/* encoder → fusion */}
          <line
            x1="320"
            y1={y}
            x2="392"
            y2={FUSION_Y[i]}
            stroke="var(--ink-faint)"
            markerEnd="url(#arr-npp)"
          />
        </g>
      ))}

      {/* late fusion */}
      <rect
        x="400"
        y="125"
        width="110"
        height="50"
        rx="4"
        fill="var(--paper-raised)"
        stroke="var(--accent)"
      />
      <text
        x="455"
        y="154"
        textAnchor="middle"
        fontSize="14"
        fill="var(--ink-strong)"
      >
        Late fusion
      </text>

      {/* fusion → prediction */}
      <line
        x1="510"
        y1="150"
        x2="546"
        y2="150"
        stroke="var(--ink-faint)"
        markerEnd="url(#arr-npp)"
      />
      <rect
        x="552"
        y="125"
        width="120"
        height="50"
        rx="4"
        fill="var(--accent-soft)"
        stroke="var(--accent)"
      />
      <text
        x="612"
        y="147"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="var(--accent)"
      >
        NPP
      </text>
      <text
        x="612"
        y="165"
        textAnchor="middle"
        fontSize="12"
        fill="var(--accent)"
      >
        prediction
      </text>
    </svg>
  );
}
