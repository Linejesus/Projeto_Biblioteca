import { TestBed } from '@angular/core/testing';
import { BibliotecasDisponiveis } from './bibliotecas.disponiveis.component';

describe('BibliotecasDisponiveis', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecasDisponiveis],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BibliotecasDisponiveis);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(BibliotecasDisponiveis);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
