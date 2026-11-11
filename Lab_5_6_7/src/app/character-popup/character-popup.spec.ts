import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { CharactersService } from '../characters-service';
import { Character } from '../interfaces/character';
import { CharacterPopup } from './character-popup';

// Тести попапу. Попап показується, коли в сервісі є вибраний персонаж.
describe('CharacterPopup', () => {
  let component: CharacterPopup;
  let fixture: ComponentFixture<CharacterPopup>;
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
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CharacterPopup],
      providers: [{ provide: CharactersService, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('не повинен показувати попап, якщо персонаж не вибраний', () => {
    expect(fixture.nativeElement.querySelector('.popup')).toBeNull();
  });

  it('повинен показати імʼя вибраного персонажа', () => {
    serviceMock.selected.set(harry);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toBe('Harry Potter');
  });

  it('клік по фону повинен закрити попап', () => {
    serviceMock.selected.set(harry);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.overlay').click();

    expect(serviceMock.selected()).toBeNull();
  });

  it('кнопка "У вибране" повинна викликати toggleFavorite', () => {
    serviceMock.selected.set(harry);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('button').click();

    expect(serviceMock.toggleFavorite).toHaveBeenCalledWith(harry);
  });
});
