import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { CharactersService } from './characters-service';

describe('CharactersService', () => {
  let service: CharactersService;
  let storageMock: any;

  beforeEach(() => {
    storageMock = {
      create: vi.fn().mockResolvedValue(undefined),
      get: vi.fn().mockResolvedValue(null),
      set: vi.fn().mockResolvedValue(undefined),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Storage, useValue: storageMock }],
    });

    service = TestBed.inject(CharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});