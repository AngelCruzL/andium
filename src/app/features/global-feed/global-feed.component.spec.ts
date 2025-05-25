import { render, screen } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { GlobalFeedComponent } from './global-feed.component';

describe('GlobalFeedComponent', () => {
  const setup = async () => {
    await render(GlobalFeedComponent, {
      providers: [provideMockStore({})],
      imports: [RouterTestingModule],
    });
  };

  it('should create', async () => {
    await setup();

    const globalFeedComponent = screen.queryByTestId('home-page');
    expect(globalFeedComponent).toBeTruthy();
  });
});
