import { TestBed } from '@angular/core/testing';

import { PaddingDecimalFieldsService } from './padding-decimal-fields.service';

describe('PaddingDecimalFieldsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaddingDecimalFieldsService = TestBed.get(PaddingDecimalFieldsService);
    expect(service).toBeTruthy();
  });
});
