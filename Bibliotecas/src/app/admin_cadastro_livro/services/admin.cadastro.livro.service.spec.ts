import { TestBed } from '@angular/core/testing';
import { AdminCadastroLivroService } from './admin.cadastro.livro.service';

describe('AdminCadastroLivroService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCadastroLivroService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminCadastroLivroService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminCadastroLivroService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
