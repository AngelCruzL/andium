import type { FormControl } from '@angular/forms';

import { CurrentUser, SignInUser } from '@shared/types';

export interface SignInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface SignInPayload {
  user: SignInUser;
}

export interface SignInResponse {
  user: CurrentUser;
}
