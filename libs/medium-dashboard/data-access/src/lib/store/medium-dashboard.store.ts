import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import type { Medium } from '@test-task-insilicobiotech/medium-dashboard/models';

import { MediumDashboardApiService } from '../api/medium-dashboard-api.service';

type MediumDashboardState = {
  medium: Medium | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: MediumDashboardState = {
  medium: null,
  isLoading: false,
  error: null,
};

export const MediumDashboardStore = signalStore(
  withState(initialState),
  withMethods((store, api = inject(MediumDashboardApiService)) => ({
    loadMedium: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          api.getMedium().pipe(
            tapResponse({
              next: (medium) => patchState(store, { medium, isLoading: false }),
              error: (error: unknown) =>
                patchState(store, {
                  isLoading: false,
                  error: error instanceof Error ? error.message : 'Failed to load medium',
                }),
            })
          )
        )
      )
    ),
  }))
);

export type MediumDashboardStore = InstanceType<typeof MediumDashboardStore>;
