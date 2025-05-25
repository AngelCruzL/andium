import { render, screen } from '@testing-library/angular';

import { PaginationComponent } from '@shared/components';

const setup = async () => {
  await render(PaginationComponent, {
    inputs: {
      paginationLimit: 10,
      totalItems: 100,
      currentPage: 3,
      url: '/test',
    },
  });
};

describe('PaginationComponent', () => {
  it('should create', async () => {
    await setup();

    const paginationComponent = screen.getByTestId('pagination');
    expect(paginationComponent).toBeTruthy();
  });

  it('should display the correct number of pages based on total items and pagination limit', async () => {
    await setup();

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks.length).toBe(10);
  });

  it('should highlight the current page as active', async () => {
    await setup();

    const activePage = screen.getByText('3').closest('li');
    expect(activePage!.classList).toContain('active');
  });

  it('should not display any pages if total items is zero', async () => {
    await render(PaginationComponent, {
      inputs: {
        paginationLimit: 10,
        totalItems: 0,
        currentPage: 1,
        url: '/test',
      },
    });

    const pageLinks = screen.queryAllByRole('link');
    expect(pageLinks.length).toBe(0);
  });

  it('should generate correct query parameters for each page link', async () => {
    await render(PaginationComponent, {
      inputs: {
        paginationLimit: 10,
        totalItems: 30,
        currentPage: 1,
        url: '/test',
      },
    });

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks[0].getAttribute('href')).toBe('/test?page=1');
    expect(pageLinks[1].getAttribute('href')).toBe('/test?page=2');
    expect(pageLinks[2].getAttribute('href')).toBe('/test?page=3');
  });
});
