import { TestBed } from '@angular/core/testing';
import { BibliotecasDisponiveisService } from './bibliotecas.disponiveis.service';

describe('BibliotecasDisponiveisService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecasDisponiveisService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BibliotecasDisponiveisService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(BibliotecasDisponiveisService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
