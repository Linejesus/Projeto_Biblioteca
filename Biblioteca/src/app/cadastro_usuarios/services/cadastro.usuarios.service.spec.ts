import { TestBed } from '@angular/core/testing';
import { CadastroUsuariosService } from './cadastro.usuarios.service';

describe('CadastroUsuariosService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroUsuariosService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CadastroUsuariosService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(CadastroUsuariosService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
