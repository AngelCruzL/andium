import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendErrors } from '@shared/types';
import { BackendErrorMessagesComponent } from '@shared/components';

describe('BackendErrorMessagesComponent', () => {
  let component: BackendErrorMessagesComponent;
  let fixture: ComponentFixture<BackendErrorMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendErrorMessagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackendErrorMessagesComponent);
    fixture.componentRef.setInput('backendErrors', null);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error messages', () => {
    const backendErrors: BackendErrors = {
      email: ['is invalid'],
      password: ['is too short'],
    };
    fixture.componentRef.setInput('backendErrors', backendErrors);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const errorMessages = compiled.querySelectorAll('li');
    expect(errorMessages.length).toBe(2);
    expect(errorMessages[0].textContent).toContain('email is invalid');
    expect(errorMessages[1].textContent).toContain('password is too short');
  });

  it('should not display any error messages if backendErrors is null', () => {
    fixture.componentRef.setInput('backendErrors', null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const errorMessages = compiled.querySelectorAll('li');
    expect(errorMessages.length).toBe(0);
  });
});
