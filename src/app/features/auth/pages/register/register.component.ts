import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

import { BackendErrorMessagesComponent } from '@shared/components';
import { RegisterState, SignUpForm, SignUpPayload } from '../../types';
import {
  authActions,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, BackendErrorMessagesComponent],
  templateUrl: './register.component.html',
  styles: ``,
})
export default class RegisterComponent implements OnInit {
  registerForm!: FormGroup<SignUpForm>;
  #fb = inject(FormBuilder);
  #store = inject(Store);
  $data: Signal<RegisterState> = toSignal(
    combineLatest({
      isSubmitting: this.#store.select(selectIsSubmitting),
      validationErrors: this.#store.select(selectValidationErrors),
    }),
    { initialValue: { isSubmitting: false, validationErrors: null } },
  );

  get disableSubmit(): boolean {
    return this.registerForm.invalid || this.$data().isSubmitting;
  }

  ngOnInit(): void {
    this.registerForm = this.#fb.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.disableSubmit) return;

    const payload: SignUpPayload = {
      user: this.registerForm.getRawValue(),
    };
    this.#store.dispatch(authActions.register({ payload }));
  }
}
