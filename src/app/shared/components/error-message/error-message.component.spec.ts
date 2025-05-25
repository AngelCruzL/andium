import { render, screen } from '@testing-library/angular';

import { ErrorMessageComponent } from '@shared/components';

describe('ErrorMessageComponent', () => {
  const setup = async (errorMessage?: string) => {
    await render(ErrorMessageComponent, {
      inputs: errorMessage ? { errorMessage } : {},
    });
  };

  it('should create', async () => {
    await setup();

    const errorMessageComponent = screen.queryByRole('alert');
    expect(errorMessageComponent).toBeTruthy();
  });

  describe('Layout', () => {
    it('should display the default error message if no one is provided', async () => {
      await setup();

      const errorMessage = screen.queryByRole('alert');
      expect(errorMessage!.textContent!.trim()).toBe('Something went wrong');
    });

    it('should display the provided error message', async () => {
      const customErrorMessage = 'Custom error occurred';
      await setup(customErrorMessage);

      const errorMessage = screen.queryByRole('alert');
      expect(errorMessage!.textContent!.trim()).toBe(customErrorMessage);
    });
  });
});
