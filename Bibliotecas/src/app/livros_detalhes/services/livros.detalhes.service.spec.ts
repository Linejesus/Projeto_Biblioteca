import { TestBed } from '@angular/core/testing';
import { LivrosDetalhesService } from './livros.detalhes.service';

describe('LivrosDetalhesService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrosDetalhesService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LivrosDetalhesService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(LivrosDetalhesService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
