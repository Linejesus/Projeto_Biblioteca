import { TestBed } from '@angular/core/testing';
import { AdminCadastroUsuarioService } from './admin.cadastro.usuario.service';

describe('CadastroUsuariosService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCadastroUsuarioService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminCadastroUsuarioService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminCadastroUsuarioService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
