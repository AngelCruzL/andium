import { createActionGroup, props } from '@ngrx/store';

import { BackendErrors, CurrentUser } from '@shared/types';
import { SignUpPayload } from '../types';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ payload: SignUpPayload }>(),
    'Register Success': props<{ currentUser: CurrentUser }>(),
    'Register Failure': props<{ errors: BackendErrors }>(),
  },
});
