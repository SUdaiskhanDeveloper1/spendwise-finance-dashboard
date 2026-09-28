interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  label: string;
}

/**
 * Tiny inline trend. Rendered as plain SVG on the server, so it costs no
 * chart-library JavaScript. History is drawn in the de-emphasis grey and the
 * latest period in the accent colour.
 */
export function Sparkline({ data, width = 88, height = 32, label }: SparklineProps) {
  if (data.length < 2) return null;
  const pad = 4;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (width - pad * 2) / (data.length - 1);
  const points = data.map((value, i) => [pad + i * step, pad + (height - pad * 2) * (1 - (value - min) / range)] as const);
  const path = (list: readonly (readonly [number, number])[]) =>
    list.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <path d={path(points)} fill="none" stroke="var(--chakra-colors-chart-muted)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d={path(points.slice(-2))} fill="none" stroke="var(--chakra-colors-accent-default)" strokeWidth={2} strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r={4} fill="var(--chakra-colors-accent-default)" stroke="var(--chakra-colors-bg-surface)" strokeWidth={2} />
    </svg>
  );
}
