import { TestBed } from '@angular/core/testing';
import { AdminCadastroLivro } from './admin.cadastro.livro.component';

describe('AdminCadastroLivro', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCadastroLivro],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminCadastroLivro);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminCadastroLivro);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
