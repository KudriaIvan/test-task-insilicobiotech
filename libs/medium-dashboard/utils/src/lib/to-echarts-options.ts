import type { EChartsOption } from 'echarts';

import type {
  ChartMode,
  MediumChartData,
} from '@test-task-insilicobiotech/medium-dashboard/ui/models';

function assertNever(value: never): never {
  throw new Error(`Unhandled ChartMode: ${String(value)}`);
}

export function toEChartsOptions(data: MediumChartData, mode: ChartMode): EChartsOption {
  const labels = data.entries.map((e) => e.label);

  switch (mode) {
    case 'absolute':
      return {
        tooltip: { trigger: 'axis' },
        legend: { data: ['Reference', 'Optimised'] },
        xAxis: { type: 'category', data: labels, axisLabel: { interval: 0 } },
        yAxis: { type: 'value' },
        series: [
          {
            name: 'Reference',
            type: 'bar',
            data: data.entries.map((e) => e.refValue),
          },
          {
            name: 'Optimised',
            type: 'bar',
            data: data.entries.map((e) => e.optValue),
          },
        ],
      };

    case 'relative':
      return {
        tooltip: {
          trigger: 'axis',
          valueFormatter: (v) => `${Number(v).toFixed(1)} %`,
        },
        xAxis: { type: 'category', data: labels, axisLabel: { interval: 0 } },
        yAxis: {
          type: 'value',
          name: 'Change (%)',
          axisLabel: { formatter: '{value} %' },
        },
        series: [
          {
            name: 'Change',
            type: 'bar',
            data: data.entries.map((e) => e.optValue),
            markLine: {
              silent: true,
              symbol: 'none',
              lineStyle: { color: '#999', type: 'dashed' },
              data: [{ yAxis: 0 }],
            },
          },
        ],
      };

    default:
      return assertNever(mode);
  }
}
