import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { screen } from '@testing-library/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TopBarComponent } from '@shared/components';
import { selectCurrentUser } from '../../../features/auth/store';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let store: MockStore;
  const initialState = { currentUser: undefined };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent],
      providers: [provideRouter([]), provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Sign in" and "Sign up" when no user is logged in', () => {
    // Confirm that the currentUser is null
    store.overrideSelector(selectCurrentUser, null);
    store.setState({ currentUser: null });
    fixture.detectChanges();

    const signInLink = screen.getByRole('link', { name: /sign in/i });
    const signUpLink = screen.getByText(/sign up/i, { selector: 'a' });

    expect(signInLink).toBeTruthy();
    expect(signUpLink).toBeTruthy();
  });

  it('should display user info when a user is logged in', () => {
    const currentUser = {
      email: 'test@test.com',
      token: 'some-token',
      username: 'testuser',
      image: 'testimage.jpg',
      bio: 'test bio',
    };
    store.overrideSelector(selectCurrentUser, currentUser);
    store.setState({ currentUser });
    fixture.detectChanges();

    const userLink = screen.getByRole('link', { name: currentUser.username });
    const userImage = screen.getByRole('presentation');

    expect(userLink).toBeTruthy();
    expect(userImage.getAttribute('src')).toContain(currentUser.image);
  });
});
