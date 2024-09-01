import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { SignUpForm, SignUpPayload } from '../../types';
import { register } from '../../store';

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

  get disableSubmit(): boolean {
    return this.registerForm.invalid;
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
