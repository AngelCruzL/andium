import { render, screen } from '@testing-library/angular';

import { TagListComponent } from './tag-list.component';

const setup = async () => {
  await render(TagListComponent, {
    inputs: {
      tags: ['tag1', 'tag2', 'tag3'],
    },
  });
};

describe('TagListComponent', () => {
  it('should create', async () => {
    await setup();

    const component = screen.queryByTestId('tag-list');
    expect(component).toBeTruthy();
  });

  describe('Layout', () => {
    it('should render 3 tags', async () => {
      await setup();

      const tags = screen.getAllByRole('listitem');
      expect(tags.length).toBe(3);
    });
  });
});
