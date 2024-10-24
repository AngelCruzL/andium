import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { screen } from '@testing-library/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { authActions } from '../../store';
import LoginComponent from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [provideRouter([]), provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  describe('View', () => {
    it('should render the "Sign In" heading', () => {
      const heading = screen.getByRole('heading', { name: 'Sign In' });
      expect(heading).toBeTruthy();
    });

    it('should render the "Need an account?" link', () => {
      const link = screen.getByRole('link', { name: 'Need an account?' });
      expect(link).toBeTruthy();
    });

    it.each`
      inputName     | label
      ${'email'}    | ${'Email'}
      ${'password'} | ${'Password'}
    `('should render the $inputName input', ({ label }) => {
      const input = screen.getByLabelText(label);
      expect(input).toBeTruthy();
    });

    it('should render the "Sign In" button', () => {
      const button = screen.getByRole('button', { name: 'Sign In' });
      expect(button).toBeTruthy();
    });
  });

  describe('onSubmit', () => {
    it('should not submit the form if disableSubmit is true', () => {
      component.loginForm.setValue({
        email: '',
        password: '',
      });
      const consoleSpy = jest.spyOn(console, 'log');
      component.onSubmit();
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should submit the form if disableSubmit is false', () => {
      component.loginForm.setValue({
        email: 'mail@test.com',
        password: 'Secret123',
      });
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.onSubmit();
      expect(dispatchSpy).toHaveBeenCalledWith(
        authActions.login({
          payload: {
            user: {
              email: 'mail@test.com',
              password: 'Secret123',
            },
          },
        }),
      );
    });
  });
});
