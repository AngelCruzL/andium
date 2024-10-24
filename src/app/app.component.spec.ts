import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TopBarComponent } from '@shared/components';
import { AppComponent } from './app.component';
import { authReducer } from './features/auth/store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TopBarComponent,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', authReducer),
      ],
      providers: [provideRouter([]), provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should dispatch getCurrentUser action on init', () => {
    const getCurrentUserSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();

    expect(getCurrentUserSpy).toHaveBeenCalled();
  });
});
