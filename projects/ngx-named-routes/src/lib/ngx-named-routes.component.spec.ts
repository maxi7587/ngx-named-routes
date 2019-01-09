import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNamedRoutesComponent } from './ngx-named-routes.component';

describe('NgxNamedRoutesComponent', () => {
  let component: NgxNamedRoutesComponent;
  let fixture: ComponentFixture<NgxNamedRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNamedRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNamedRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
