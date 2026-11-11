import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { CharactersService } from '../characters-service';
import { Character } from '../interfaces/character';
import { CharactersTable } from './characters-table';

// Тести таблиці всіх персонажів. Замість справжнього сервісу використовується мок.
describe('CharactersTable', () => {
  let component: CharactersTable;
  let fixture: ComponentFixture<CharactersTable>;
  let serviceMock: any;

  const harry: Character = {
    fullName: 'Harry Potter',
    nickname: 'Harry',
    hogwartsHouse: 'Gryffindor',
    interpretedBy: 'Daniel Radcliffe',
    children: [],
    image: '',
    birthdate: '31-07-1980',
    index: 0,
  };

  beforeEach(async () => {
    serviceMock = {
      characters: signal<Character[]>([harry]),
      favorites: signal<Character[]>([]),
      selected: signal<Character | null>(null),
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CharactersTable],
      providers: [{ provide: CharactersService, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('повинен показати рядок для кожного персонажа', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(1);
  });

  it('повинен показати імʼя персонажа', () => {
    expect(fixture.nativeElement.textContent).toContain('Harry Potter');
  });

  it('повинен вибрати персонажа при кліку на рядок', () => {
    fixture.nativeElement.querySelector('tbody tr').click();

    expect(serviceMock.selected()).toEqual(harry);
  });

  it('клік по checkbox повинен викликати toggleFavorite', () => {
    fixture.nativeElement.querySelector('input').click();

    expect(serviceMock.toggleFavorite).toHaveBeenCalledWith(harry);
  });
});
