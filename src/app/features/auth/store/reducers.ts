import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthState } from '../types';
import { authActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

export const initialState: AuthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, state => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, { currentUser }) => ({
      ...state,
      isSubmitting: false,
      currentUser,
    })),
    on(authActions.registerFailure, (state, { errors }) => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })),

    on(authActions.login, state => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, { currentUser }) => ({
      ...state,
      isSubmitting: false,
      currentUser,
    })),
    on(authActions.loginFailure, (state, { errors }) => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })),

    on(authActions.getCurrentUser, state => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, { currentUser }) => ({
      ...state,
      isLoading: false,
      currentUser,
    })),
    on(authActions.getCurrentUserFailure, state => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),

    on(routerNavigatedAction, state => ({ ...state, validationErrors: null })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
