import { BackendErrors, CurrentUser } from '@shared/types';

export interface AuthState {
  isSubmitting: boolean;
  currentUser: CurrentUser | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrors | null;
}

export type RegisterState = Omit<AuthState, 'currentUser' | 'isLoading'>;
