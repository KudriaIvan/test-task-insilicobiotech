import type { BarSeriesOption } from 'echarts/charts';

import type { MediumChartData } from '@test-task-insilicobiotech/medium-dashboard/ui/models';

import { toEChartsOptions } from './to-echarts-options';

const ABSOLUTE_DATA: MediumChartData = {
  entries: [
    { label: 'Glucose', unit: 'g/L', refValue: 4.0, optValue: 4.8 },
    { label: 'NaCl', unit: 'g/L', refValue: 8.0, optValue: 7.2 },
  ],
};

const RELATIVE_DATA: MediumChartData = {
  entries: [
    { label: 'Glucose', unit: '%', refValue: null, optValue: 20 },
    { label: 'NaCl', unit: '%', refValue: null, optValue: -10 },
  ],
};

describe('toEChartsOptions', () => {
  describe('absolute mode', () => {
    it('produces two bar series named Reference and Optimised', () => {
      const result = toEChartsOptions(ABSOLUTE_DATA, 'absolute');
      const series = result.series as BarSeriesOption[];

      expect(series).toHaveLength(2);
      expect(series[0].name).toBe('Reference');
      expect(series[1].name).toBe('Optimised');
    });

    it('maps refValue and optValue to the correct series data', () => {
      const result = toEChartsOptions(ABSOLUTE_DATA, 'absolute');
      const series = result.series as BarSeriesOption[];

      expect(series[0].data).toEqual([4.0, 8.0]);
      expect(series[1].data).toEqual([4.8, 7.2]);
    });

    it('sets xAxis category labels from entry labels', () => {
      const result = toEChartsOptions(ABSOLUTE_DATA, 'absolute');
      const xAxis = result.xAxis as { data: string[] };

      expect(xAxis.data).toEqual(['Glucose', 'NaCl']);
    });

    it('includes a legend with Reference and Optimised', () => {
      const result = toEChartsOptions(ABSOLUTE_DATA, 'absolute');
      const legend = result.legend as { data: string[] };

      expect(legend.data).toEqual(['Reference', 'Optimised']);
    });

    it('does not set a yAxis name', () => {
      const result = toEChartsOptions(ABSOLUTE_DATA, 'absolute');
      const yAxis = result.yAxis as { name?: string };

      expect(yAxis.name).toBeUndefined();
    });
  });

  describe('relative mode', () => {
    it('produces a single bar series named Change', () => {
      const result = toEChartsOptions(RELATIVE_DATA, 'relative');
      const series = result.series as BarSeriesOption[];

      expect(series).toHaveLength(1);
      expect(series[0].name).toBe('Change');
    });

    it('maps optValue to the series data', () => {
      const result = toEChartsOptions(RELATIVE_DATA, 'relative');
      const series = result.series as BarSeriesOption[];

      expect(series[0].data).toEqual([20, -10]);
    });

    it('sets yAxis name and percent formatter', () => {
      const result = toEChartsOptions(RELATIVE_DATA, 'relative');
      const yAxis = result.yAxis as { name: string; axisLabel: { formatter: string } };

      expect(yAxis.name).toBe('Change (%)');
      expect(yAxis.axisLabel.formatter).toBe('{value} %');
    });

    it('always adds markLine at y=0', () => {
      const result = toEChartsOptions(RELATIVE_DATA, 'relative');
      const series = result.series as BarSeriesOption[];
      const markLine = series[0].markLine as { data: { yAxis: number }[] };

      expect(markLine.data).toEqual([{ yAxis: 0 }]);
    });

    it('tooltip valueFormatter formats a number with one decimal and percent sign', () => {
      const result = toEChartsOptions(RELATIVE_DATA, 'relative');
      const tooltip = result.tooltip as { valueFormatter: (v: unknown) => string };

      expect(tooltip.valueFormatter(20)).toBe('20.0 %');
      expect(tooltip.valueFormatter(-10.5)).toBe('-10.5 %');
    });

    it('passes null gap entry optValue through to series data', () => {
      const dataWithGap: MediumChartData = {
        entries: [{ label: 'NewCompound', unit: '%', refValue: null, optValue: null }],
      };
      const result = toEChartsOptions(dataWithGap, 'relative');
      const series = result.series as BarSeriesOption[];

      expect(series[0].data).toEqual([null]);
    });
  });
});
