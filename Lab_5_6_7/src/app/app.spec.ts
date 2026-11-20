import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { App } from './app';
import { CharactersService } from './characters-service';
import { Character } from './interfaces/character';

// Тести головного компонента. Сервіс замінений моком, щоб не завантажувати дані з API.
describe('App', () => {
  let serviceMock: any;

  beforeEach(async () => {
    serviceMock = {
      characters: signal<Character[]>([]),
      favorites: signal<Character[]>([]),
      selected: signal<Character | null>(null),
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
      loading: signal(false),
      error: signal<string | null>(null),
      load: vi.fn().mockResolvedValue(undefined),
      closeError: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: CharactersService, useValue: serviceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ТАБЛИЦЯ ВСІХ ПЕРСОНАЖІВ');
  });

  it('повинен завантажити дані при старті', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(serviceMock.load).toHaveBeenCalled();
  });

  it('повинен показати помилку на екрані', () => {
    const fixture = TestBed.createComponent(App);
    serviceMock.error.set("Немає з'єднання з сервером");
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.error').textContent).toContain(
      "Немає з'єднання з сервером",
    );
  });

  it('кнопка "Спробувати ще раз" повинна заново викликати load', () => {
    const fixture = TestBed.createComponent(App);
    serviceMock.error.set('Помилка');
    fixture.detectChanges();
    serviceMock.load.mockClear();

    fixture.nativeElement.querySelector('.error button').click();

    expect(serviceMock.load).toHaveBeenCalled();
  });
});
