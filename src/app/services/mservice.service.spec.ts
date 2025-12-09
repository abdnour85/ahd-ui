import { TestBed } from '@angular/core/testing';

import { mservice } from './mservice.service';

describe('mservice', () => {
  let service: mservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(mservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
