import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import {
  currentUserMock,
  signInPayloadMock,
  signUpPayloadMock,
} from '../utils';
import { AuthService } from '../services';
import { authActions } from './actions';
import {
  loginEffect,
  redirectAfterLoginEffect,
  redirectAfterRegisterEffect,
  registerEffect,
} from './effects';

describe('AuthEffects', () => {
  describe('register', () => {
    it('should return a "registerSuccess" action', () => {
      const authServiceMock = {
        register: () => of(currentUserMock),
      } as unknown as AuthService;
      const actionsMock$ = of(
        authActions.register({ payload: signUpPayloadMock }),
      );

      TestBed.runInInjectionContext(() => {
        registerEffect(actionsMock$, authServiceMock).subscribe(action => {
          expect(action).toEqual(
            authActions.registerSuccess({ currentUser: currentUserMock }),
          );
        });
      });
    });

    it('should return a "registerFailure" action on error', () => {
      const mockErrors = { username: ['email already taken'] };
      const authServiceMock = {
        register: () =>
          throwError(() => ({
            error: { errors: mockErrors },
          })),
      } as unknown as AuthService;
      const actionsMock$ = of(
        authActions.register({ payload: signUpPayloadMock }),
      );

      TestBed.runInInjectionContext(() => {
        registerEffect(actionsMock$, authServiceMock).subscribe(action => {
          expect(action).toEqual(
            authActions.registerFailure({ errors: mockErrors }),
          );
        });
      });
    });

    describe('AuthEffects', () => {
      it('should navigate to "/" on registerSuccess', () => {
        const routerMock = {
          navigateByUrl: jest.fn(),
        } as unknown as Router;
        const actionsMock$ = of(
          authActions.registerSuccess({ currentUser: currentUserMock }),
        );

        TestBed.runInInjectionContext(() => {
          redirectAfterRegisterEffect(actionsMock$, routerMock).subscribe(
            () => {
              expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
            },
          );
        });
      });
    });
  });

  describe('login', () => {
    it('should return a "loginSuccess" action', () => {
      const authServiceMock = {
        login: () => of(currentUserMock),
      } as unknown as AuthService;
      const actionsMock$ = of(
        authActions.login({ payload: signInPayloadMock }),
      );

      TestBed.runInInjectionContext(() => {
        loginEffect(actionsMock$, authServiceMock).subscribe(action => {
          expect(action).toEqual(
            authActions.loginSuccess({ currentUser: currentUserMock }),
          );
        });
      });
    });

    it('should return a "loginFailure" action on error', () => {
      const mockErrors = { username: ['email already taken'] };
      const authServiceMock = {
        login: () =>
          throwError(() => ({
            error: { errors: mockErrors },
          })),
      } as unknown as AuthService;
      const actionsMock$ = of(
        authActions.login({ payload: signInPayloadMock }),
      );

      TestBed.runInInjectionContext(() => {
        loginEffect(actionsMock$, authServiceMock).subscribe(action => {
          expect(action).toEqual(
            authActions.loginFailure({ errors: mockErrors }),
          );
        });
      });
    });

    describe('AuthEffects', () => {
      it('should navigate to "/" on loginSuccess', () => {
        const routerMock = {
          navigateByUrl: jest.fn(),
        } as unknown as Router;
        const actionsMock$ = of(
          authActions.loginSuccess({ currentUser: currentUserMock }),
        );

        TestBed.runInInjectionContext(() => {
          redirectAfterLoginEffect(actionsMock$, routerMock).subscribe(() => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
          });
        });
      });
    });
  });
});
