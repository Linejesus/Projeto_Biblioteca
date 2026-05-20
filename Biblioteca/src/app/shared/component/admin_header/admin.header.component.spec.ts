import { TestBed } from '@angular/core/testing';
import { AdminHeader } from './admin.header.component';

describe('AdminHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHeader],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminHeader);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AdminHeader);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
