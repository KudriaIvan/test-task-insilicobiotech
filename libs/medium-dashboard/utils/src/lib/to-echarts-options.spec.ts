import type { BarSeriesOption } from 'echarts/charts';

import type { MediumChartData } from '@test-task-insilicobiotech/medium-dashboard/ui/models';
import { CHART_PALETTE } from '@test-task-insilicobiotech/medium-dashboard/constants';

import { toEChartsOptions } from './to-echarts-options';

const DATA: MediumChartData = {
  entries: [
    { label: 'Glucose', unit: 'g/L', refValue: 4.0, optValue: 4.8 },
    { label: 'NaCl', unit: 'g/L', refValue: 1.0, optValue: 0.9 },
    { label: 'NaCl', unit: 'g/L', refValue: 1.0, optValue: 0.9 },
  ],
};

describe('toEChartsOptions', () => {
  describe('absolute mode', () => {
    it('produces Reference and Optimised series', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const series = result.series as BarSeriesOption[];

      expect(series).toHaveLength(2);
      expect(series[0].name).toBe('Reference');
      expect(series[1].name).toBe('Optimised');
    });


    it('assigns first palette color to first compound optimised bar', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const optSeries = (result.series as BarSeriesOption[])[1];
      const firstItem = (optSeries.data as { value: number; itemStyle: { color: string } }[])[0];

      expect(firstItem.itemStyle.color).toBe(CHART_PALETTE[0]);
    });

    it('assigns second palette color to second compound optimised bar', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const optSeries = (result.series as BarSeriesOption[])[1];
      const items = optSeries.data as { value: number; itemStyle: { color: string } }[];

      expect(items[1]?.itemStyle.color).toBe(CHART_PALETTE[1]);
    });

    it('reference bars use a lighter shade than optimised bars', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const [refSeries, optSeries] = result.series as BarSeriesOption[];
      const refItem = (refSeries.data as { itemStyle: { color: string } }[])[0];
      const optItem = (optSeries.data as { itemStyle: { color: string } }[])[0];

      expect(refItem.itemStyle.color).not.toBe(optItem.itemStyle.color);
      expect(refItem.itemStyle.color).not.toBe(CHART_PALETTE[0]);
    });

  });

  describe('relative mode', () => {

    it('adds markLine at y=1.0 on the Reference series', () => {
      const result = toEChartsOptions(DATA, 'relative');
      const refSeries = (result.series as BarSeriesOption[])[0];
      const markLine = refSeries.markLine as { data: { yAxis: number }[] };

      expect(markLine.data).toEqual([{ yAxis: 1.0 }]);
    });

    it('produces both Reference and Optimised series', () => {
      const result = toEChartsOptions(DATA, 'relative');
      const series = result.series as BarSeriesOption[];

      expect(series).toHaveLength(2);
    });
  });
});
