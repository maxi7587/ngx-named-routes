import { TestBed, async } from '@angular/core/testing';
import { TestComponent } from './test.component';

describe('TestComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
    }).compileComponents();
  }));

  it('should create TestComponent', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
