import { TestBed } from '@angular/core/testing';
import { AdminListarBibliotecas } from './admin.listar.bibliotecas.component';

describe('AdminListarBibliotecas', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarBibliotecas],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminListarBibliotecas);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminListarBibliotecas);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
