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
      load: vi.fn().mockResolvedValue(undefined),
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
});
