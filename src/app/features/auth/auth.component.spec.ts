import { AuthComponent } from './auth.component';
import { render } from '@testing-library/angular';

const setup = async () => {
  return await render(AuthComponent, {
    imports: [AuthComponent],
  });
};

describe('AuthComponent', () => {
  it('should create', async () => {
    const { fixture } = await setup();
    const authComponent = fixture.debugElement.componentInstance;

    expect(authComponent).toBeTruthy();
  });
});
