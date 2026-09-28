import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { formatValue, type ValueFormat } from '@/lib/format';
import type { ChartDatum, ChartSeries } from './types';

interface ChartTableProps {
  data: ChartDatum[];
  series: ChartSeries[];
  xKey?: string;
  xLabel?: string;
  format?: ValueFormat;
  caption: string;
}

/** The accessible twin of a chart: the same numbers as a table. */
export function ChartTable({ data, series, xKey = 'name', xLabel = 'Period', format = 'currency', caption }: ChartTableProps) {
  return (
    <Box overflowX="auto" borderWidth="1px" borderColor="border.subtle" borderRadius="lg">
      <Table size="sm" aria-label={caption}>
        <Thead>
          <Tr>
            <Th>{xLabel}</Th>
            {series.map((s) => (
              <Th key={s.key} isNumeric>
                {s.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={String(row[xKey])}>
              <Td fontWeight={500}>{row[xKey]}</Td>
              {series.map((s) => (
                <Td key={s.key} isNumeric textStyle="numeric">
                  {formatValue(Number(row[s.key] ?? 0), format)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
