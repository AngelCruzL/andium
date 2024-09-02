import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { SignUpForm, SignUpPayload } from '../../types';
import { register, selectIsSubmitting } from '../../store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: ``,
})
export default class RegisterComponent implements OnInit {
  registerForm!: FormGroup<SignUpForm>;
  #fb = inject(FormBuilder);
  #store = inject(Store);
  $isSubmitting = toSignal(this.#store.select(selectIsSubmitting), {
    initialValue: false,
  });

  get disableSubmit(): boolean {
    return this.registerForm.invalid || this.$isSubmitting();
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

    // TODO: Implement form submission
    const payload: SignUpPayload = {
      user: this.registerForm.getRawValue(),
    };
    this.#store.dispatch(register({ payload }));
  }
}
