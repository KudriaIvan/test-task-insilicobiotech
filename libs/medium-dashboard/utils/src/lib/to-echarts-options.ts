import type { EChartsOption } from 'echarts';

import { CHART_PALETTE } from '@test-task-insilicobiotech/medium-dashboard/constants';
import type {
  ChartEntry,
  ChartMode,
  MediumChartData,
} from '@test-task-insilicobiotech/medium-dashboard/ui/models';

const FONT_FAMILY = 'Manrope, system-ui, sans-serif';

function assertNever(value: never): never {
  throw new Error(`Unhandled ChartMode: ${String(value)}`);
}

function lightenHex(hex: string, amount = 0.5): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.round(r + (255 - r) * amount);
  const lg = Math.round(g + (255 - g) * amount);
  const lb = Math.round(b + (255 - b) * amount);
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
}

function assignColors(entries: ChartEntry[]): { color: string }[] {
  return entries.map((_, i) => ({
    color: CHART_PALETTE[i % CHART_PALETTE.length],
  }));
}

function toItemData(
  value: number | null,
  color: string
): { value: number | null; itemStyle: { color: string } } {
  return { value, itemStyle: { color } };
}

export function toEChartsOptions(data: MediumChartData, mode: ChartMode): EChartsOption {
  const colors = assignColors(data.entries);
  const labels = data.entries.map((e) => e.label);

  const refSeries = data.entries.map((entry, i) =>
    toItemData(entry.refValue, lightenHex(colors[i].color))
  );

  const optSeries = data.entries.map((entry, i) =>
    toItemData(entry.optValue, colors[i].color)
  );

  const baseOption: Partial<EChartsOption> = {
    textStyle: { fontFamily: FONT_FAMILY },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: labels, axisLabel: { interval: 0 } },
    series: [
      { name: 'Reference', type: 'bar', data: refSeries },
      { name: 'Optimised', type: 'bar', data: optSeries },
    ],
  };

  switch (mode) {
    case 'absolute':
      return {
        ...baseOption,
        yAxis: { type: 'value' },
      };

    case 'relative':
      return {
        ...baseOption,
        yAxis: { type: 'value' },
        series: [
          {
            name: 'Reference',
            type: 'bar',
            data: refSeries,
            markLine: {
              silent: true,
              symbol: 'none',
              lineStyle: { color: '#999', type: 'dashed' },
              data: [{ yAxis: 1.0 }],
            },
          },
          { name: 'Optimised', type: 'bar', data: optSeries },
        ],
      };

    default:
      return assertNever(mode);
  }
}
