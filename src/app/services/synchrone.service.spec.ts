import { TestBed } from '@angular/core/testing';

import { SynchroneService } from './synchrone.service';

describe('SynchroneService', () => {
  let service: SynchroneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SynchroneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
