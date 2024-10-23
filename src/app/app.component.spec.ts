import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore, StoreModule } from '@ngrx/store';

import { TopBarComponent } from '@shared/components';
import { AppComponent } from './app.component';
import { authReducer } from './features/auth/store';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TopBarComponent,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', authReducer),
      ],
      providers: [provideRouter([]), provideStore()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
