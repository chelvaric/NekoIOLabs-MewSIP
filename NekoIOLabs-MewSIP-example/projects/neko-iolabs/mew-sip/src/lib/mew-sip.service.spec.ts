import { TestBed } from '@angular/core/testing';

import { MewSipService } from './mew-sip.service';

describe('MewSipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MewSipService = TestBed.get(MewSipService);
    expect(service).toBeTruthy();
  });
});
