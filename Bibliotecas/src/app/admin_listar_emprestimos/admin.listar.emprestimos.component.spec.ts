import { TestBed } from '@angular/core/testing';
import { AdminListarEmprestimos } from './admin.listar.emprestimos.component';

describe('AdminListarEmprestimos', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarEmprestimos],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminListarEmprestimos);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminListarEmprestimos);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
