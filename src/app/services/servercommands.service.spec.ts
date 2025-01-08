import { TestBed } from '@angular/core/testing';

import { ServercommandsService } from './servercommands.service';

describe('ServercommandsService', () => {
  let service: ServercommandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServercommandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
