import { CurrentUser, User } from '@shared/types';

import { authReducer, initialState } from './reducers';
import { authActions } from './actions';

const mockUser: User = {
  username: 'test',
  email: 'mail@mail.com',
  password: 'Secret123',
};

const userResponseMock: CurrentUser = {
  bio: '',
  image: '',
  username: 'testuser',
  token: 'some-token',
  email: 'test@test.com',
};

describe('AuthReducers', () => {
  it('should returns a default state', () => {
    const action = { type: 'Unknown' };
    const state = authReducer(initialState, action);
    const newState = {
      isSubmitting: false,
      isLoading: false,
      currentUser: undefined,
      validationErrors: null,
    };

    expect(state).toEqual(newState);
  });

  it('register', () => {
    const action = authActions.register({ payload: { user: mockUser } });
    const state = authReducer(initialState, action);
    const newState = {
      isSubmitting: true,
      isLoading: false,
      validationErrors: null,
      currentUser: undefined,
    };

    expect(state).toEqual(newState);
  });

  it('registerSuccess', () => {
    const action = authActions.registerSuccess({
      currentUser: userResponseMock,
    });
    const state = authReducer(initialState, action);
    const newState = {
      isSubmitting: false,
      isLoading: false,
      currentUser: userResponseMock,
      validationErrors: null,
    };

    expect(state).toEqual(newState);
  });

  it('registerFailure', () => {
    const mockErrors = { username: ['email already taken'] };
    const action = authActions.registerFailure({ errors: mockErrors });
    const state = authReducer(initialState, action);
    const newState = {
      isSubmitting: false,
      isLoading: false,
      currentUser: undefined,
      validationErrors: mockErrors,
    };

    expect(state).toEqual(newState);
  });
});
