import { TestBed } from '@angular/core/testing';
import { Emprestimos } from './emprestimos.component';

describe('Emprestimos', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emprestimos],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Emprestimos);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(Emprestimos);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
