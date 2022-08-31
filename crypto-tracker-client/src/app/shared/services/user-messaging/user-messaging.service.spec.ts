import { TestBed } from '@angular/core/testing';

import { UserMessagingService } from './user-messaging.service';

describe('UserMessagingService', () => {
  let service: UserMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
