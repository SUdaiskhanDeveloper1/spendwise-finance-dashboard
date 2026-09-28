/** Share of `total`, as a whole-number percentage capped at 100 (for progress bars). */
export const percent = (value: number, total: number) =>
  total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;

/** Uncapped fraction, e.g. 1.1 for an over-spent budget. */
export const ratio = (value: number, total: number) => (total > 0 ? value / total : 0);

/** Relative change as a fraction: 0.058 for +5.8%. */
export const change = (current: number, previous: number) =>
  previous === 0 ? 0 : (current - previous) / Math.abs(previous);

export const sumBy = <T,>(items: readonly T[], pick: (item: T) => number) =>
  items.reduce((total, item) => total + pick(item), 0);

export const roundMoney = (value: number) => Math.round(value * 100) / 100;

export function groupBy<T, K extends string>(items: readonly T[], key: (item: T) => K) {
  return items.reduce(
    (groups, item) => {
      const k = key(item);
      (groups[k] ??= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
}
