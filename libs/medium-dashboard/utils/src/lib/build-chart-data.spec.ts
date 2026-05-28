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

    it('produces one entry per compound', () => {
      const result = buildChartData(MEDIUM, 'absolute');

      expect(result.entries).toHaveLength(MEDIUM.components.length);
    });
  });

  describe('relative mode', () => {
    it('sets refValue to 1.0 for all entries', () => {
      const result = buildChartData(MEDIUM, 'relative');

      result.entries.forEach((entry) => {
        expect(entry.refValue).toBe(1.0);
      });
    });

    it('calculates optValue as opt / ref ratio', () => {
      const result = buildChartData(MEDIUM, 'relative');

      expect(result.entries[0].optValue).toBeCloseTo(1.2);  // 4.8 / 4.0
      expect(result.entries[1].optValue).toBeCloseTo(0.9);  // 7.2 / 8.0
      expect(result.entries[2].optValue).toBeCloseTo(1.28); // 3.2 / 2.5
    });
  });

  describe('zero reference (gap entry)', () => {
    it('returns null for both values when ref_value is zero in relative mode', () => {
      const medium: Medium = {
        name: 'Gap Medium',
        components: [{ name: 'NewCompound', unit: 'g/L', ref_value: 0, opt_value: 1.5 }],
      };

      const result = buildChartData(medium, 'relative');

      expect(result.entries[0].refValue).toBeNull();
      expect(result.entries[0].optValue).toBeNull();
    });

    it('does not affect absolute mode values', () => {
      const medium: Medium = {
        name: 'Gap Medium',
        components: [{ name: 'NewCompound', unit: 'g/L', ref_value: 0, opt_value: 1.5 }],
      };

      const result = buildChartData(medium, 'absolute');

      expect(result.entries[0].refValue).toBe(0);
      expect(result.entries[0].optValue).toBe(1.5);
    });
  });
});
