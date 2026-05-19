import { TestBed } from '@angular/core/testing';
import { AdminListarEmprestimosService } from './admin.listar.emprestimos.service';

describe('AdminListarEmprestimosService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarEmprestimosService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminListarEmprestimosService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminListarEmprestimosService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
