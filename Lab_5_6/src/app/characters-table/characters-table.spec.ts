import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersTable } from './characters-table';

describe('CharactersTable', () => {
  let component: CharactersTable;
  let fixture: ComponentFixture<CharactersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
