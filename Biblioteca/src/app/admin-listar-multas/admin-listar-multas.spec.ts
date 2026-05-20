import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListarMultas } from './admin-listar-multas';

describe('AdminListarMultas', () => {
  let component: AdminListarMultas;
  let fixture: ComponentFixture<AdminListarMultas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarMultas],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminListarMultas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
