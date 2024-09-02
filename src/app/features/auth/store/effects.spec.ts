import { of, throwError } from 'rxjs';

import { CurrentUser } from '@shared/types';
import { AuthService } from '../services/auth.service';
import { SignUpPayload } from '../types';
import { authActions } from './actions';
import { registerEffect } from './effects';

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

    registerEffect(actionsMock$, authServiceMock).subscribe(action => {
      expect(action).toEqual(
        authActions.registerSuccess({ currentUser: userResponseMock }),
      );
    });
  });

  it('should return a "registerFailure" action on error', () => {
    const authServiceMock = {
      register: () => throwError(() => new Error('Error')),
    } as unknown as AuthService;
    const actionsMock$ = of(authActions.register({ payload }));

    registerEffect(actionsMock$, authServiceMock).subscribe(action => {
      expect(action).toEqual(authActions.registerFailure());
    });
  });
});
