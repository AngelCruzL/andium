import { render, screen } from '@testing-library/angular';

import { BackendErrors } from '@shared/types';
import { BackendErrorMessagesComponent } from '@shared/components';

const setup = async (backendErrors?: BackendErrors) => {
  await render(BackendErrorMessagesComponent, {
    inputs: {
      backendErrors: backendErrors ?? null,
    },
  });
};

describe('BackendErrorMessagesComponent', () => {
  it('should create', async () => {
    await setup();

    const errorMessagesComponent = screen.queryByRole('alert');
    expect(errorMessagesComponent).toBeTruthy();
  });

  describe('Layout', () => {
    it('should display error messages', async () => {
      const backendErrors: BackendErrors = {
        email: ['is invalid'],
        password: ['is too short'],
      };
      await setup(backendErrors);

      const errorMessages = screen.queryAllByRole('listitem')!;
      expect(errorMessages.length).toBe(2);
      expect(errorMessages[0].textContent).toContain('email is invalid');
      expect(errorMessages[1].textContent).toContain('password is too short');
    });

    it('should not display any error messages if backendErrors is null', async () => {
      await setup();

      const errorMessages = screen.queryAllByRole('listitem')!;
      expect(errorMessages.length).toBe(0);
    });
  });
});
