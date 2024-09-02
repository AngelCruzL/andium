import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { screen } from '@testing-library/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { authActions } from '../../store';
import RegisterComponent from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [provideRouter([]), provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  describe('View', () => {
    it('should render the "Sign Up" heading', () => {
      const heading = screen.getByRole('heading', { name: 'Sign Up' });
      expect(heading).toBeTruthy();
    });

    it('should render the "Have an account?" link', () => {
      const link = screen.getByRole('link', { name: 'Have an account?' });
      expect(link).toBeTruthy();
    });

    it.each`
      inputName     | label
      ${'username'} | ${'Username'}
      ${'email'}    | ${'Email'}
      ${'password'} | ${'Password'}
    `('should render the $inputName input', ({ label }) => {
      const input = screen.getByLabelText(label);
      expect(input).toBeTruthy();
    });

    it('should render the "Sign Up" button', () => {
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeTruthy();
    });
  });

  describe('onSubmit', () => {
    it('should not submit the form if disableSubmit is true', () => {
      component.registerForm.setValue({
        username: '',
        email: '',
        password: '',
      });
      const consoleSpy = jest.spyOn(console, 'log');
      component.onSubmit();
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should submit the form if disableSubmit is false', () => {
      component.registerForm.setValue({
        username: 'test',
        email: 'mail@test.com',
        password: 'Secret123',
      });
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.onSubmit();
      expect(dispatchSpy).toHaveBeenCalledWith(
        authActions.register({
          payload: {
            user: {
              username: 'test',
              email: 'mail@test.com',
              password: 'Secret123',
            },
          },
        }),
      );
    });
  });
});
