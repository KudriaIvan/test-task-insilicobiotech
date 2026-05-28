import type { Medium } from '@test-task-insilicobiotech/medium-dashboard/models';
import type {
  ChartEntry,
  ChartMode,
  MediumChartData,
} from '@test-task-insilicobiotech/medium-dashboard/ui/models';

function assertNever(value: never): never {
  throw new Error(`Unhandled ChartMode: ${String(value)}`);
}

function createGapEntry(): ChartEntry {
  return {
    label: '',
    unit: '',
    refValue: null,
    optValue: null,
    isGap: true,
  };
}

function withGapEntries(entries: ChartEntry[]): ChartEntry[] {
  return entries.flatMap((entry, index) =>
    index < entries.length - 1 ? [entry, createGapEntry()] : [entry],
  );
}

export function buildChartData(
  medium: Medium,
  mode: ChartMode,
): MediumChartData {
  switch (mode) {
    case 'absolute':
      return {
        entries: withGapEntries(
          medium.components.map(
            (c): ChartEntry => ({
              label: c.name,
              unit: c.unit,
              refValue: c.ref_value,
              optValue: c.opt_value,
            }),
          ),
        ),
      };

    case 'relative':
      return {
        entries: withGapEntries(
          medium.components.map(
            (c): ChartEntry => ({
              label: c.name,
              unit: '×',
              refValue: c.ref_value !== 0 ? 1.0 : null,
              optValue: c.ref_value !== 0 ? c.opt_value / c.ref_value : null,
            }),
          ),
        ),
      };

    default:
      return assertNever(mode);
  }
}
