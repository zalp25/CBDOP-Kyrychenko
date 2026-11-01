import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPopup } from './character-popup';

describe('CharacterPopup', () => {
  let component: CharacterPopup;
  let fixture: ComponentFixture<CharacterPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
