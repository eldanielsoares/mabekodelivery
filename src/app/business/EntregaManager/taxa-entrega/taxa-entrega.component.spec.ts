import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxaEntregaComponent } from './taxa-entrega.component';

describe('TaxaEntregaComponent', () => {
  let component: TaxaEntregaComponent;
  let fixture: ComponentFixture<TaxaEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxaEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
