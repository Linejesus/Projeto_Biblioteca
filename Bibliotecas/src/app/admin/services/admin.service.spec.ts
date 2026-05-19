import { TestBed } from '@angular/core/testing';
import { DashboardService } from './admin.service';

describe('DashboardService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(DashboardService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
