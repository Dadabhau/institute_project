import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayouts } from './auth-layouts';

describe('AuthLayouts', () => {
  let component: AuthLayouts;
  let fixture: ComponentFixture<AuthLayouts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayouts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLayouts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
