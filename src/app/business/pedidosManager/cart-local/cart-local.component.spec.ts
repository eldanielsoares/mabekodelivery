import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLocalComponent } from './cart-local.component';

describe('CartLocalComponent', () => {
  let component: CartLocalComponent;
  let fixture: ComponentFixture<CartLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
