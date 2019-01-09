import { TestBed } from '@angular/core/testing';

import { NgxNamedRoutesService } from './ngx-named-routes.service';

describe('NgxNamedRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxNamedRoutesService = TestBed.get(NgxNamedRoutesService);
    expect(service).toBeTruthy();
  });
});
