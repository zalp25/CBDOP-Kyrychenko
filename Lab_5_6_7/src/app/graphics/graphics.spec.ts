import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { CharactersService } from '../characters-service';
import { Character } from '../interfaces/character';
import { Graphics } from './graphics';

// Тести графіка. Сам малюнок не перевіряємо, бо в тестах немає canvas, перевіряємо підрахунок.
describe('Graphics', () => {
  let component: Graphics;
  let fixture: ComponentFixture<Graphics>;
  let serviceMock: any;

  beforeEach(async () => {
    serviceMock = {
      characters: signal<Character[]>([]),
    };

    await TestBed.configureTestingModule({
      imports: [Graphics],
      providers: [{ provide: CharactersService, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Graphics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('повинен порахувати персонажів по факультетах', () => {
    serviceMock.characters.set([
      { hogwartsHouse: 'Gryffindor' } as Character,
      { hogwartsHouse: 'Gryffindor' } as Character,
      { hogwartsHouse: 'Slytherin' } as Character,
    ]);

    expect(component['count']()).toEqual([2, 0, 1, 0]);
  });
});
