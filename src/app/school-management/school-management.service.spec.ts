import { TestBed } from '@angular/core/testing';

import { SchoolManagementService } from './school-management.service';

describe('SchoolManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolManagementService = TestBed.get(SchoolManagementService);
    expect(service).toBeTruthy();
  });
});
