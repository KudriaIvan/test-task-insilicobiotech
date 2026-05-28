import type { Medium } from '@test-task-insilicobiotech/medium-dashboard/models';

import { buildChartData } from './build-chart-data';

const MEDIUM: Medium = {
  name: 'Test Medium',
  components: [
    { name: 'Glucose', unit: 'g/L', ref_value: 4.0, opt_value: 4.8 },
    { name: 'NaCl', unit: 'g/L', ref_value: 8.0, opt_value: 7.2 },
    { name: 'Glutamine', unit: 'mmol/L', ref_value: 2.5, opt_value: 3.2 },
  ],
};

describe('buildChartData', () => {
  describe('absolute mode', () => {
    it('maps ref and opt values directly', () => {
      const result = buildChartData(MEDIUM, 'absolute');

      expect(result.entries).toEqual([
        { label: 'Glucose', unit: 'g/L', refValue: 4.0, optValue: 4.8 },
        { label: 'NaCl', unit: 'g/L', refValue: 8.0, optValue: 7.2 },
        { label: 'Glutamine', unit: 'mmol/L', refValue: 2.5, optValue: 3.2 },
      ]);
    });
  });

  describe('relative mode', () => {
    it('calculates percentage change from ref to opt', () => {
      const result = buildChartData(MEDIUM, 'relative');

      expect(result.entries[0].optValue).toBeCloseTo(20); // (4.8 - 4.0) / 4.0 * 100
      expect(result.entries[1].optValue).toBeCloseTo(-10); // (7.2 - 8.0) / 8.0 * 100
      expect(result.entries[2].optValue).toBeCloseTo(28); // (3.2 - 2.5) / 2.5 * 100
    });

    it('sets refValue to null for all entries', () => {
      const result = buildChartData(MEDIUM, 'relative');

      result.entries.forEach((entry) => {
        expect(entry.refValue).toBeNull();
      });
    });

    it('uses percent as unit for all entries', () => {
      const result = buildChartData(MEDIUM, 'relative');

      result.entries.forEach((entry) => {
        expect(entry.unit).toBe('%');
      });
    });
  });

  describe('gap entries', () => {
    it('generates a gap entry when ref_value is zero in relative mode', () => {
      const mediumWithGap: Medium = {
        name: 'Gap Medium',
        components: [{ name: 'NewCompound', unit: 'g/L', ref_value: 0, opt_value: 1.5 }],
      };

      const result = buildChartData(mediumWithGap, 'relative');

      expect(result.entries[0].optValue).toBeNull();
    });

    it('does not generate a gap entry in absolute mode for the same component', () => {
      const mediumWithGap: Medium = {
        name: 'Gap Medium',
        components: [{ name: 'NewCompound', unit: 'g/L', ref_value: 0, opt_value: 1.5 }],
      };

      const result = buildChartData(mediumWithGap, 'absolute');

      expect(result.entries[0].refValue).toBe(0);
      expect(result.entries[0].optValue).toBe(1.5);
    });
  });
});
