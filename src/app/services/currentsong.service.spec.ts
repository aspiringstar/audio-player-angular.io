import { TestBed } from '@angular/core/testing';

import { CurrentsongService } from './currentsong.service';

describe('CurrentsongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentsongService = TestBed.get(CurrentsongService);
    expect(service).toBeTruthy();
  });
});
