import { TestBed } from '@angular/core/testing';
import { AdminCadastroEmprestimo } from './admin.cadastro.emprestimo.component';

describe('AdminCadastroEmprestimo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCadastroEmprestimo],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminCadastroEmprestimo);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminCadastroEmprestimo);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
