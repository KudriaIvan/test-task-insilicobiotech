import { Injectable } from '@angular/core';
import { delay, of, type Observable } from 'rxjs';

import type { Medium } from '@test-task-insilicobiotech/medium-dashboard/models';

import { MOCK_MEDIUM } from '../fixtures/medium.fixtures';

@Injectable()
export class MediumDashboardApiService {
  getMedium(): Observable<Medium> {
    return of(MOCK_MEDIUM).pipe(delay(500));
  }
}
