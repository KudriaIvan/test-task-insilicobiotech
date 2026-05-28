export type ChartMode = 'absolute' | 'relative';

export interface ChartEntry {
  label: string;
  unit: string;
  optValue: number | null;
  refValue: number | null;
}

export interface MediumChartData {
  entries: ChartEntry[];
  yAxisLabel: string;
  showReferenceLine: boolean;
}