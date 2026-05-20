import { TestBed } from '@angular/core/testing';
import { CadastroUsuarios } from './cadastro.usuarios.component';

describe('CadastroUsuarios', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroUsuarios],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CadastroUsuarios);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(CadastroUsuarios);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
