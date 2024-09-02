import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { authActions } from './actions';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ payload }) =>
        authService.register(payload).pipe(
          map(currentUser => authActions.registerSuccess({ currentUser })),
          catchError(() => of(authActions.registerFailure())),
        ),
      ),
    );
  },
  { functional: true },
);
