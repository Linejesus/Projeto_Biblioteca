import { TestBed } from '@angular/core/testing';
import { LivrosDetalhes } from './livros.detalhes.component';

describe('LivrosDetalhes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrosDetalhes],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LivrosDetalhes);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(LivrosDetalhes);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
