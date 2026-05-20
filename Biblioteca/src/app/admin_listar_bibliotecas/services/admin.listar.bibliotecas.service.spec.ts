import { TestBed } from '@angular/core/testing';
import { AdminListarBibliotecasService } from './admin.listar.bibliotecas.service';

describe('AdminListarBibliotecasService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarBibliotecasService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminListarBibliotecasService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminListarBibliotecasService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
