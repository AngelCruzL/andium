import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { PersistenceService } from '@shared/services';
import { AuthService } from '../services';
import { authActions } from './actions';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ payload }) =>
        authService.register(payload).pipe(
          map(currentUser => {
            persistenceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              }),
            ),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ payload }) =>
        authService.login(payload).pipe(
          map(currentUser => {
            persistenceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              }),
            ),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    const token = persistenceService.get('accessToken');
    if (!token) return of(authActions.getCurrentUserFailure());

    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() =>
        authService.getCurrentUser().pipe(
          map(currentUser => {
            return authActions.getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => of(authActions.getCurrentUserFailure())),
        ),
      ),
    );
  },
  { functional: true },
);
