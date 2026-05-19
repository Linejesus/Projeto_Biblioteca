import { TestBed } from '@angular/core/testing';
import { AdminListarLivrosService } from './admin.listar.livros.service';

describe('AdminListarLivrosService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarLivrosService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminListarLivrosService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminListarLivrosService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
