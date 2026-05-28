import type { EChartsOption } from 'echarts';

import { CHART_PALETTE } from '@test-task-insilicobiotech/medium-dashboard/constants';
import type {
  ChartEntry,
  ChartMode,
  MediumChartData,
} from '@test-task-insilicobiotech/medium-dashboard/ui/models';

const FONT_FAMILY = 'Manrope, system-ui, sans-serif';
const TRANSPARENT = 'transparent';
const ABSOLUTE_Y_AXIS_NAME = 'Concentration';
const RELATIVE_Y_AXIS_NAME = 'Relative to reference';
const CHART_GRID: EChartsOption['grid'] = {
  top: 24,
  left: 72,
  right: 16,
  bottom: 8,
  containLabel: true,
};

type BarItemData = {
  value: number;
  unit: string;
  itemStyle: {
    color: string;
  };
};

type TooltipParam = {
  name?: unknown;
  seriesName?: unknown;
  color?: unknown;
  data?: unknown;
  dataIndex?: unknown;
};

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
  let compoundIndex = 0;

  return entries.map((entry) => {
    if (entry.isGap) {
      return { color: TRANSPARENT };
    }

    const color = CHART_PALETTE[compoundIndex % CHART_PALETTE.length];
    compoundIndex += 1;
    return { color };
  });
}

function toItemData(value: number, unit: string, color: string): BarItemData {
  return {
    value,
    unit,
    itemStyle: { color },
  };
}

function isTooltipParam(value: unknown): value is TooltipParam {
  return typeof value === 'object' && value !== null;
}

function escapeHtml(value: string): string {
  const replacements: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return value.replace(/[&<>"']/g, (char) => replacements[char] ?? char);
}

function formatValue(value: number, unit: string): string {
  const formattedValue = Number.isInteger(value)
    ? value.toString()
    : value.toFixed(3).replace(/\.?0+$/, '');

  return unit ? `${formattedValue} ${unit}` : formattedValue;
}

function toTooltipParams(params: unknown): TooltipParam[] {
  if (Array.isArray(params)) {
    return params.filter((item): item is TooltipParam => isTooltipParam(item));
  }

  return isTooltipParam(params) ? [params] : [];
}

function toTooltipRow(
  seriesName: string,
  color: string,
  data: BarItemData | null,
): string | null {
  if (!data) {
    return null;
  }

  const displayedValue = escapeHtml(formatValue(data.value, data.unit));

  return `
    <div style="display: flex; align-items: center; gap: 8px">
      <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${escapeHtml(color)}"></span>
      <span>${escapeHtml(seriesName)}</span>
      <strong style="margin-left: auto">${displayedValue}</strong>
    </div>
  `;
}

function formatTooltip(
  params: unknown,
  refSeries: Array<BarItemData | null>,
  optSeries: Array<BarItemData | null>,
): string {
  const tooltipParams = toTooltipParams(params);
  const param = tooltipParams[0];

  if (
    !param ||
    typeof param.name !== 'string' ||
    !param.name ||
    typeof param.dataIndex !== 'number'
  ) {
    return '';
  }

  const refItem = refSeries[param.dataIndex] ?? null;
  const optItem = optSeries[param.dataIndex] ?? null;
  const rows = [
    toTooltipRow('Reference', refItem?.itemStyle.color ?? TRANSPARENT, refItem),
    toTooltipRow('Optimised', optItem?.itemStyle.color ?? TRANSPARENT, optItem),
  ].filter((row): row is string => row !== null);

  if (rows.length === 0) {
    return '';
  }

  return `
    <div style="min-width: 140px">
      <div style="font-weight: 600; margin-bottom: 6px">${escapeHtml(param.name)}</div>
      <div style="display: grid; gap: 4px">
        ${rows.join('')}
      </div>
    </div>
  `;
}

function toYAxis(name: string): EChartsOption['yAxis'] {
  return {
    type: 'value',
    name,
    nameLocation: 'middle',
    nameRotate: 90,
    nameGap: 48,
    nameTextStyle: {
      color: '#4b5563',
      fontWeight: 500,
    },
  };
}

export function toEChartsOptions(
  data: MediumChartData,
  mode: ChartMode,
): EChartsOption {
  const colors = assignColors(data.entries);
  const labels = data.entries.map((e) => e.label);

  const refSeries = data.entries.map((entry, i) => {
    if (entry.isGap || entry.refValue === null) {
      return null;
    }

    return toItemData(entry.refValue, entry.unit, lightenHex(colors[i].color));
  });

  const optSeries = data.entries.map((entry, i) => {
    if (entry.isGap || entry.optValue === null) {
      return null;
    }

    return toItemData(entry.optValue, entry.unit, colors[i].color);
  });

  const baseOption: Partial<EChartsOption> = {
    grid: CHART_GRID,
    textStyle: { fontFamily: FONT_FAMILY },
    tooltip: {
      trigger: 'axis',
      formatter: (params: unknown) =>
        formatTooltip(params, refSeries, optSeries),
    },
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
        yAxis: toYAxis(ABSOLUTE_Y_AXIS_NAME),
      };

    case 'relative':
      return {
        ...baseOption,
        yAxis: toYAxis(RELATIVE_Y_AXIS_NAME),
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
