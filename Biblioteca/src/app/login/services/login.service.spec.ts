import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginService);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(LoginService);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Biblioteca');
  });
});
