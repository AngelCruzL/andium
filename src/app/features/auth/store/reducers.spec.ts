import { currentUserMock, signUpPayloadMock } from '../utils';
import { authReducer, initialState } from './reducers';
import { authActions } from './actions';

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

  describe('register', () => {
    it('register', () => {
      const action = authActions.register({ payload: signUpPayloadMock });
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
        currentUser: currentUserMock,
      });
      const state = authReducer(initialState, action);
      const newState = {
        isSubmitting: false,
        isLoading: false,
        currentUser: currentUserMock,
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

  describe('login', () => {});
});
