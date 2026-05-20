import { TestBed } from '@angular/core/testing';
import { AdminListarLivros } from './admin.listar.livros.component';

describe('AdminListarLivros', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarLivros],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminListarLivros);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminListarLivros);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
