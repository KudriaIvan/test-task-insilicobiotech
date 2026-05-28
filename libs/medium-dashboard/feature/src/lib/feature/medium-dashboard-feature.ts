import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MediumDashboardStore } from '@test-task-insilicobiotech/medium-dashboard/data-access';

@Component({
  selector: 'lib-medium-dashboard-feature',
  imports: [],
  templateUrl: './medium-dashboard-feature.html',
  styleUrl: './medium-dashboard-feature.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediumDashboardFeature {
  private readonly mediumDashboardStore = inject(MediumDashboardStore)

  constructor() {
    this.mediumDashboardStore.loadMedium();

    effect(() => {
      console.log(this.mediumDashboardStore.medium());
    })
  }
}
