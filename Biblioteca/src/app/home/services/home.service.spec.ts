import { TestBed } from '@angular/core/testing';
import { HomeService } from './home.service';

describe('HomeService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(HomeService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
