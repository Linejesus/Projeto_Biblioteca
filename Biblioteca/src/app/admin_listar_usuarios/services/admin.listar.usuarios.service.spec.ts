import { TestBed } from '@angular/core/testing';
import { AdminListarUsuariosService } from './admin.listar.usuarios.service';

describe('AdminListarUsuariosService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarUsuariosService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminListarUsuariosService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminListarUsuariosService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
