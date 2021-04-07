import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalShopComponent } from './local-shop.component';

describe('LocalShopComponent', () => {
  let component: LocalShopComponent;
  let fixture: ComponentFixture<LocalShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
