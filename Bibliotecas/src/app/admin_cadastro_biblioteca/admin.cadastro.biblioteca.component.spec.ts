import { TestBed } from '@angular/core/testing';
import { AdminCadastroBiblioteca } from './admin.cadastro.biblioteca.component';

describe('AdminCadastroBiblioteca', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCadastroBiblioteca],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminCadastroBiblioteca);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminCadastroBiblioteca);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
