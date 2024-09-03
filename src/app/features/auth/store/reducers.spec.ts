import {
  currentUserMock,
  errorMocks,
  signInPayloadMock,
  signUpPayloadMock,
} from '../utils';
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
    it('should trigger register reducer at register action', () => {
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

    it('should trigger registerSuccess reducer at registerSuccess action', () => {
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

    it('should trigger registerFailure reducer at registerFailure action', () => {
      const action = authActions.registerFailure({ errors: errorMocks });
      const state = authReducer(initialState, action);
      const newState = {
        isSubmitting: false,
        isLoading: false,
        currentUser: undefined,
        validationErrors: errorMocks,
      };

      expect(state).toEqual(newState);
    });
  });

  describe('login', () => {
    it('should trigger login reducer at login action', () => {
      const action = authActions.login({ payload: signInPayloadMock });
      const state = authReducer(initialState, action);
      const newState = {
        isSubmitting: true,
        isLoading: false,
        validationErrors: null,
        currentUser: undefined,
      };

      expect(state).toEqual(newState);
    });

    it('should trigger loginSuccess reducer at loginSuccess action', () => {
      const action = authActions.loginSuccess({ currentUser: currentUserMock });
      const state = authReducer(initialState, action);
      const newState = {
        isSubmitting: false,
        isLoading: false,
        currentUser: currentUserMock,
        validationErrors: null,
      };

      expect(state).toEqual(newState);
    });

    it('should trigger loginFailure reducer at loginFailure action', () => {
      const action = authActions.loginFailure({ errors: errorMocks });
      const state = authReducer(initialState, action);
      const newState = {
        isSubmitting: false,
        isLoading: false,
        currentUser: undefined,
        validationErrors: errorMocks,
      };

      expect(state).toEqual(newState);
    });
  });
});
