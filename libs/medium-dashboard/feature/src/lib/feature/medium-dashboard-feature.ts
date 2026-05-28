import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiGroup } from '@taiga-ui/core';
import { TuiBlock, TuiSkeleton } from '@taiga-ui/kit';
import { TuiRadio } from '@taiga-ui/core';

import { MediumDashboardStore } from '@test-task-insilicobiotech/medium-dashboard/data-access';
import { MediumChartComponent } from '@test-task-insilicobiotech/medium-dashboard/ui/chart';
import type { ChartMode } from '@test-task-insilicobiotech/medium-dashboard/ui/models';
import { buildChartData, toEChartsOptions } from '@test-task-insilicobiotech/medium-dashboard/utils';

@Component({
  selector: 'lib-medium-dashboard-feature',
  imports: [FormsModule, TuiGroup, TuiBlock, TuiRadio, TuiSkeleton, MediumChartComponent],
  templateUrl: './medium-dashboard-feature.html',
  styleUrl: './medium-dashboard-feature.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediumDashboardFeature {
  private readonly store = inject(MediumDashboardStore);

  protected readonly isLoading = this.store.isLoading;
  protected readonly error = this.store.error;
  protected readonly mode = signal<ChartMode>('absolute');

  protected readonly chartOptions = computed(() => {
    const medium = this.store.medium();
    return medium ? toEChartsOptions(buildChartData(medium, this.mode()), this.mode()) : null;
  });

  constructor() {
    this.store.loadMedium();
  }
}
