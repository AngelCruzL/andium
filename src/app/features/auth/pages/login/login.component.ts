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
import { RegisterState, SignInForm, SignInPayload } from '../../types';
import {
  authActions,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, BackendErrorMessagesComponent],
  templateUrl: './login.component.html',
  styles: ``,
})
export default class LoginComponent implements OnInit {
  loginForm!: FormGroup<SignInForm>;
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
    return this.loginForm.invalid || this.$data().isSubmitting;
  }

  ngOnInit(): void {
    this.loginForm = this.#fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.disableSubmit) return;

    const payload: SignInPayload = {
      user: this.loginForm.getRawValue(),
    };
    this.#store.dispatch(authActions.login({ payload }));
  }
}
