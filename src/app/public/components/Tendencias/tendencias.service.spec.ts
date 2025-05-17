import { TestBed } from '@angular/core/testing';

import { TendenciasService } from './tendencias.service';

describe('TendenciasService', () => {
  let service: TendenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TendenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
