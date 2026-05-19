import { TestBed } from '@angular/core/testing';
import { EmprestimosService } from './emprestimos.service';

describe('EmprestimosService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimosService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EmprestimosService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(EmprestimosService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
