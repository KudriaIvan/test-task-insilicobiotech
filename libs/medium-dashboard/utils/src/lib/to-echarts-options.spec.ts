import type { BarSeriesOption } from 'echarts/charts';

import type { MediumChartData } from '@test-task-insilicobiotech/medium-dashboard/ui/models';
import { CHART_PALETTE } from '@test-task-insilicobiotech/medium-dashboard/constants';

import { toEChartsOptions } from './to-echarts-options';

type ItemData = {
  value: number;
  unit: string;
  itemStyle: {
    color: string;
  };
};

type SeriesData = Array<ItemData | null>;

type ValueAxisOption = {
  type: 'value';
  name: string;
  nameLocation: string;
  nameRotate: number;
  nameGap: number;
};

type TooltipOption = {
  trigger: 'axis';
  formatter: (params: unknown) => string;
};

const DATA: MediumChartData = {
  entries: [
    { label: 'Glucose', unit: 'g/L', refValue: 4.0, optValue: 4.8 },
    { label: '', unit: '', refValue: null, optValue: null, isGap: true },
    { label: 'NaCl', unit: 'g/L', refValue: 1.0, optValue: 0.9 },
    { label: '', unit: '', refValue: null, optValue: null, isGap: true },
    { label: 'Glutamine', unit: 'mmol/L', refValue: 2.5, optValue: 3.2 },
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
      const firstItem = (optSeries.data as SeriesData)[0];

      expect(firstItem?.itemStyle.color).toBe(CHART_PALETTE[0]);
    });

    it('assigns second palette color to second compound optimised bar after a gap', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const optSeries = (result.series as BarSeriesOption[])[1];
      const items = optSeries.data as SeriesData;

      expect(items[2]?.itemStyle.color).toBe(CHART_PALETTE[1]);
    });

    it('renders gap entries as transparent null-value bar items', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const [refSeries, optSeries] = result.series as BarSeriesOption[];
      const refGap = (refSeries.data as SeriesData)[1];
      const optGap = (optSeries.data as SeriesData)[1];

      expect(refGap).toBeNull();
      expect(optGap).toBeNull();
    });

    it('reference bars use a lighter shade than optimised bars', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const [refSeries, optSeries] = result.series as BarSeriesOption[];
      const refItem = (refSeries.data as SeriesData)[0];
      const optItem = (optSeries.data as SeriesData)[0];

      expect(refItem?.itemStyle.color).not.toBe(optItem?.itemStyle.color);
      expect(refItem?.itemStyle.color).not.toBe(CHART_PALETTE[0]);
    });

    it('labels the y-axis as concentration', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const yAxis = result.yAxis as ValueAxisOption;

      expect(yAxis).toMatchObject({
        type: 'value',
        name: 'Concentration',
        nameLocation: 'middle',
        nameRotate: 90,
        nameGap: 48,
      });
    });

    it('reserves left grid space for the y-axis name', () => {
      const result = toEChartsOptions(DATA, 'absolute');

      expect(result.grid).toMatchObject({
        left: 72,
        containLabel: true,
      });
    });

    it('formats item tooltip with both reference and optimised rows', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const tooltip = result.tooltip as TooltipOption;
      const refSeries = (result.series as BarSeriesOption[])[0];
      const optSeries = (result.series as BarSeriesOption[])[1];
      const firstRefItem = (refSeries.data as SeriesData)[0];
      const firstOptItem = (optSeries.data as SeriesData)[0];
      const html = tooltip.formatter({
        name: 'Glucose',
        dataIndex: 0,
        data: firstOptItem,
      });

      expect(tooltip.trigger).toBe('axis');
      expect(html).toContain('Glucose');
      expect(html).toContain('Reference');
      expect(html).toContain('Optimised');
      expect(html).toContain('4 g/L');
      expect(html).toContain('4.8 g/L');
      expect(html).toContain(`background: ${firstRefItem?.itemStyle.color}`);
      expect(html).toContain(`background: ${CHART_PALETTE[0]}`);
    });

    it('does not show tooltip content for gap entries', () => {
      const result = toEChartsOptions(DATA, 'absolute');
      const tooltip = result.tooltip as TooltipOption;
      const optSeries = (result.series as BarSeriesOption[])[1];
      const gapItem = (optSeries.data as SeriesData)[1];

      expect(
        tooltip.formatter({
          name: '',
          dataIndex: 1,
          data: gapItem,
        }),
      ).toBe('');
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

    it('labels the y-axis as relative to reference', () => {
      const result = toEChartsOptions(DATA, 'relative');
      const yAxis = result.yAxis as ValueAxisOption;

      expect(yAxis).toMatchObject({
        type: 'value',
        name: 'Relative to reference',
        nameLocation: 'middle',
        nameRotate: 90,
        nameGap: 48,
      });
    });
  });
});
