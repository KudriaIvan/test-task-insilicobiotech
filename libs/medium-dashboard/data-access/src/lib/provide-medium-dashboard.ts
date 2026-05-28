import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { MediumDashboardApiService } from './api/medium-dashboard-api.service';
import { MediumDashboardStore } from './store/medium-dashboard.store';

export function provideMediumDashboard(): EnvironmentProviders {
  return makeEnvironmentProviders([MediumDashboardApiService, MediumDashboardStore]);
}
