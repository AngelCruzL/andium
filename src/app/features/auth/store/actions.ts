import { createAction, props } from '@ngrx/store';

import { SignUpPayload } from '../types';

export const register = createAction(
  '[Auth] Register',
  props<{ payload: SignUpPayload }>(),
);
