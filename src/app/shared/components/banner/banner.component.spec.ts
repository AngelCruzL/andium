import { render, screen } from '@testing-library/angular';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  const setup = async () => {
    await render(BannerComponent);
  };

  it('should create', async () => {
    await setup();

    const bannerComponent = screen.queryByRole('banner');
    expect(bannerComponent).toBeTruthy();
  });

  describe('Layout', () => {
    it('should display the heading', async () => {
      await setup();

      const heading = screen.queryByRole('heading', {
        name: /medium clone/i,
      });
      expect(heading).toBeTruthy();
    });

    it('should display the description', async () => {
      await setup();

      const description = screen.queryByText(/place to share your knowledge/i);
      expect(description).toBeTruthy();
    });
  });
});
