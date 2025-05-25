import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { provideMockStore } from '@ngrx/store/testing';

import { CurrentUser } from '@shared/types';
import { TopBarComponent } from '@shared/components';
import { selectCurrentUser } from '../../../features/auth/store';

const setup = async (currentUser?: CurrentUser | null) => {
  const initialState = { currentUser: currentUser };

  await render(TopBarComponent, {
    providers: [
      provideRouter([]),
      provideMockStore({
        initialState,
        selectors: [{ selector: selectCurrentUser, value: currentUser }],
      }),
    ],
  });
};

describe('TopBarComponent', () => {
  it('should create', async () => {
    await setup();

    const topBarComponent = screen.queryByRole('navigation');
    expect(topBarComponent).toBeTruthy();
  });

  describe('Layout', () => {
    it('should display "Home" link in the navigation bar', async () => {
      await setup();

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeTruthy();
    });

    it('should display the brand name "Andium" in the navigation bar', async () => {
      await setup();

      const brandLink = screen.getByRole('link', { name: /andium/i });
      expect(brandLink).toBeTruthy();
    });
  });

  describe('Store', () => {
    it('should display "Sign in" and "Sign up" when no user is logged in', async () => {
      await setup(null);

      const signInLink = screen.getByRole('link', { name: /sign in/i });
      const signUpLink = screen.getByText(/sign up/i, { selector: 'a' });

      expect(signInLink).toBeTruthy();
      expect(signUpLink).toBeTruthy();
    });

    it('should display user info when a user is logged in', async () => {
      const currentUser: CurrentUser = {
        email: 'test@test.com',
        token: 'some-token',
        username: 'testuser',
        image: 'testimage.jpg',
        bio: 'test bio',
      };
      await setup(currentUser);

      const userLink = screen.getByRole('link', { name: currentUser.username });
      const userImage = screen.getByRole('presentation');

      expect(userLink).toBeTruthy();
      expect(userImage.getAttribute('src')).toContain(currentUser.image);
    });
  });
});
