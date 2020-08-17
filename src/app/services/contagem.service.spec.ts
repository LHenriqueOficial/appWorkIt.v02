import { TestBed } from '@angular/core/testing';

import { ContagemService } from './contagem.service';

describe('ContagemService', () => {
  let service: ContagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
