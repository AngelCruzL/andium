import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { GlobalFeedComponent } from './global-feed.component';

describe('GlobalFeedComponent', () => {
  let component: GlobalFeedComponent;
  let fixture: ComponentFixture<GlobalFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalFeedComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
