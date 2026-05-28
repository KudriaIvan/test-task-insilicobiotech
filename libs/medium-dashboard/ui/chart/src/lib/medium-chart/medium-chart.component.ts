import { ChangeDetectionStrategy, Component, computed, input, type Signal } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

const DEFAULT_GRID: EChartsOption['grid'] = {
  left: 0,
  right: 0,
  containLabel: true,
};

@Component({
  selector: 'lib-medium-chart',
  imports: [NgxEchartsDirective],
  templateUrl: './medium-chart.component.html',
  styleUrl: './medium-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediumChartComponent {
  readonly options = input.required<EChartsOption>();

  protected readonly mergedOptions: Signal<EChartsOption> = computed(() => ({
    grid: DEFAULT_GRID,
    ...this.options(),
  }));
}
