import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPremiumComponent } from './shop-premium.component';

describe('ShopPremiumComponent', () => {
  let component: ShopPremiumComponent;
  let fixture: ComponentFixture<ShopPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopPremiumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
