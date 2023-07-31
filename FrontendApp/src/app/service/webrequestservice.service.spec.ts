import { TestBed } from '@angular/core/testing';

import { WebrequestserviceService } from './webrequestservice.service';

describe('WebrequestserviceService', () => {
  let service: WebrequestserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrequestserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
