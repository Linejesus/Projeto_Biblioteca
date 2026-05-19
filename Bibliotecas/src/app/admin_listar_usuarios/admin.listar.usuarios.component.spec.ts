import { TestBed } from '@angular/core/testing';
import { AdminListarUsuarios } from './admin.listar.usuarios.component';

describe('AdminListarUsuarios', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarUsuarios],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminListarUsuarios);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminListarUsuarios);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
