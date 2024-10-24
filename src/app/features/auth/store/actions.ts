import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { BackendErrors, CurrentUser } from '@shared/types';
import { SignInPayload, SignUpPayload } from '../types';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ payload: SignUpPayload }>(),
    'Register Success': props<{ currentUser: CurrentUser }>(),
    'Register Failure': props<{ errors: BackendErrors }>(),

    Login: props<{ payload: SignInPayload }>(),
    'Login Success': props<{ currentUser: CurrentUser }>(),
    'Login Failure': props<{ errors: BackendErrors }>(),

    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ currentUser: CurrentUser }>(),
    'Get Current User Failure': emptyProps(),
  },
});
