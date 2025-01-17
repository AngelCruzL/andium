import {
  currentUserMock,
  errorMocks,
  signInPayloadMock,
  signUpPayloadMock,
} from '../utils';
import { authReducer, initialState } from './reducers';
import { authActions } from './actions';
import { CurrentUser } from '@shared/types';

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

  describe('getCurrentUser', () => {
    it('should set isLoading to true when getCurrentUser action is dispatched', () => {
      const action = authActions.getCurrentUser();
      const state = authReducer(initialState, action);
      const newState = {
        ...initialState,
        isLoading: true,
      };

      expect(state).toEqual(newState);
    });

    it('should set currentUser and isLoading to false when getCurrentUserSuccess action is dispatched', () => {
      const currentUser: CurrentUser = {
        bio: null,
        image: null,
        token: '',
        username: 'testuser',
        email: 'test@test.com',
      };
      const action = authActions.getCurrentUserSuccess({ currentUser });
      const state = authReducer(initialState, action);
      const newState = {
        ...initialState,
        isLoading: false,
        currentUser,
      };

      expect(state).toEqual(newState);
    });

    it('should set currentUser to null and isLoading to false when getCurrentUserFailure action is dispatched', () => {
      const action = authActions.getCurrentUserFailure();
      const state = authReducer(initialState, action);
      const newState = {
        ...initialState,
        isLoading: false,
        currentUser: null,
      };

      expect(state).toEqual(newState);
    });
  });

  it('should clean validationErrors at routerNavigatedAction', () => {
    const action = authActions.loginFailure({ errors: errorMocks });
    const state = authReducer(initialState, action);
    const newState = {
      isSubmitting: false,
      isLoading: false,
      currentUser: undefined,
      validationErrors: errorMocks,
    };

    expect(state).toEqual(newState);

    const routerAction = { type: '@ngrx/router-store/navigated' };
    const stateAfterRouter = authReducer(state, routerAction);
    const newStateAfterRouter = {
      isSubmitting: false,
      isLoading: false,
      currentUser: undefined,
      validationErrors: null,
    };

    expect(stateAfterRouter).toEqual(newStateAfterRouter);
  });
});
