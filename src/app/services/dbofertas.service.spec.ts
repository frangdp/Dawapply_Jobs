import { TestBed } from '@angular/core/testing';

import { DbofertasService } from './dbofertas.service';

describe('DbofertasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbofertasService = TestBed.get(DbofertasService);
    expect(service).toBeTruthy();
  });
});
