import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'lib-medium-chart',
  imports: [NgxEchartsDirective],
  templateUrl: './medium-chart.component.html',
  styleUrl: './medium-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediumChartComponent {
  readonly options = input.required<EChartsOption>();
}
