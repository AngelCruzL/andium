import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthState } from '../types';
import { authActions } from './actions';

export const initialState: AuthState = {
  isSubmitting: false,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, state => ({ ...state, isSubmitting: true })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
} = authFeature;
