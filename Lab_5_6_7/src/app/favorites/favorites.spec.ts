import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { CharactersService } from '../characters-service';
import { Character } from '../interfaces/character';
import { Favorites } from './favorites';

// Тести таблиці вибраних персонажів. Замість справжнього сервісу використовується мок.
describe('Favorites', () => {
  let component: Favorites;
  let fixture: ComponentFixture<Favorites>;
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
      characters: signal<Character[]>([]),
      favorites: signal<Character[]>([]),
      selected: signal<Character | null>(null),
      isFavorite: vi.fn().mockReturnValue(true),
      toggleFavorite: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Favorites],
      providers: [{ provide: CharactersService, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Favorites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('повинен показати "Нічого не вибрано", якщо список порожній', () => {
    expect(fixture.nativeElement.textContent).toContain('Нічого не вибрано');
  });

  it('повинен показати вибраних персонажів', () => {
    serviceMock.favorites.set([harry]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Harry Potter');
  });
});
