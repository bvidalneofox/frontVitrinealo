import { TestBed } from '@angular/core/testing';

import { DestacadosService } from './destacados.service';

describe('DestacadosService', () => {
  let service: DestacadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestacadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
