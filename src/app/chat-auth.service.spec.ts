import { TestBed, inject } from '@angular/core/testing';

import { ChatAuthService } from './chat-auth.service';

describe('ChatAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatAuthService]
    });
  });

  it('should be created', inject([ChatAuthService], (service: ChatAuthService) => {
    expect(service).toBeTruthy();
  }));
});
