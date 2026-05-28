import type { Route } from '@angular/router';

import { provideMediumDashboard } from '@test-task-insilicobiotech/medium-dashboard/data-access';

import { MediumDashboardFeature } from './medium-dashboard-feature';

export const mediumDashboardRoutes: Route[] = [
  {
    path: '',
    component: MediumDashboardFeature,
    providers: [provideMediumDashboard()],
  },
];
