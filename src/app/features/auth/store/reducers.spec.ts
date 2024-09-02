import { authReducer, initialState } from './reducers';
import * as actions from './actions';
import { User } from '@shared/types';

describe('AuthReducers', () => {
  it('should returns a default state', () => {
    const action = { type: 'Unknown' };
    const state = authReducer(initialState, action);
    const newState = {
      isSubmitting: false,
    };

    expect(state).toEqual(newState);
  });

  it('register', () => {
    const mockUser: User = {
      username: 'test',
      email: 'mail@mail.com',
      password: 'Secret123',
    };
    const action = actions.register({ payload: { user: mockUser } });
    const state = authReducer(initialState, action);
    const newState = {
      isSubmitting: true,
    };

    expect(state).toEqual(newState);
  });
});
