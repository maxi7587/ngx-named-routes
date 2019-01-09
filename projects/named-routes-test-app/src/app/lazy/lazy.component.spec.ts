import { TestBed, async } from '@angular/core/testing';
import { LazyComponent } from './lazy.component';

describe('LazyComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LazyComponent
      ],
    }).compileComponents();
  }));

  it('should create LazyComponent', () => {
    const fixture = TestBed.createComponent(LazyComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
