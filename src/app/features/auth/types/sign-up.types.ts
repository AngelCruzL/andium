import type { FormControl } from '@angular/forms';

import { User } from '@shared/types';

export interface SignUpForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface SignUpPayload {
  user: User;
}
