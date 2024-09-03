import type { FormControl } from '@angular/forms';

import { SignUpUser } from '@shared/types';

export interface SignUpForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface SignUpPayload {
  user: SignUpUser;
}
