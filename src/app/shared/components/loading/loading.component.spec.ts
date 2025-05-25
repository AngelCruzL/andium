import { render, screen } from '@testing-library/angular';

import { LoadingComponent } from '@shared/components';

const setup = async () => {
  await render(LoadingComponent);
};

describe('LoadingComponent', () => {
  it('should create', async () => {
    await setup();

    const loader = screen.queryByTestId('loader');
    expect(loader).toBeTruthy();
  });
});
