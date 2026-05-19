import { TestBed } from '@angular/core/testing';
import { Admin } from './admin.component';

describe('Admin', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admin],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Admin);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(Admin);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
