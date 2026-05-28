import type { Medium } from '@test-task-insilicobiotech/medium-dashboard/models';
import type {
  ChartEntry,
  ChartMode,
  MediumChartData,
} from '@test-task-insilicobiotech/medium-dashboard/ui/models';

function assertNever(value: never): never {
  throw new Error(`Unhandled ChartMode: ${String(value)}`);
}

export function buildChartData(medium: Medium, mode: ChartMode): MediumChartData {
  switch (mode) {
    case 'absolute':
      return {
        entries: medium.components.map(
          (c): ChartEntry => ({
            label: c.name,
            unit: c.unit,
            refValue: c.ref_value,
            optValue: c.opt_value,
          })
        ),
      };

    case 'relative':
      return {
        entries: medium.components.map(
          (c): ChartEntry => ({
            label: c.name,
            unit: '%',
            refValue: null,
            // Gap entry when reference is zero — relative change is undefined.
            optValue:
              c.ref_value !== 0 ? ((c.opt_value - c.ref_value) / c.ref_value) * 100 : null,
          })
        ),
      };

    default:
      return assertNever(mode);
  }
}
