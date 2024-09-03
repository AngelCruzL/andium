import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { CurrentUser } from '@shared/types';
import { SignUpPayload } from '../types';
import { AuthService } from '../services';
import { authActions } from './actions';
import { redirectAfterRegisterEffect, registerEffect } from './effects';
import { Router } from '@angular/router';

describe('AuthEffects', () => {
  const payload: SignUpPayload = {
    user: {
      username: 'testuser',
      password: 'password123',
      email: 'test@test.com',
    },
  };

  it('should return a "registerSuccess" action', () => {
    const userResponseMock: CurrentUser = {
      bio: null,
      image: null,
      username: 'testuser',
      token: 'some-token',
      email: 'test@test.com',
    };

    const authServiceMock = {
      register: () => of(userResponseMock),
    } as unknown as AuthService;
    const actionsMock$ = of(authActions.register({ payload }));

    TestBed.runInInjectionContext(() => {
      registerEffect(actionsMock$, authServiceMock).subscribe(action => {
        expect(action).toEqual(
          authActions.registerSuccess({ currentUser: userResponseMock }),
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
    const actionsMock$ = of(authActions.register({ payload }));

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
        authActions.registerSuccess({ currentUser: {} as any }),
      );

      TestBed.runInInjectionContext(() => {
        redirectAfterRegisterEffect(actionsMock$, routerMock).subscribe(() => {
          expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
        });
      });
    });
  });
});
