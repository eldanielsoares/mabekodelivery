import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosManagerComponent } from './pedidos-manager.component';

describe('PedidosManagerComponent', () => {
  let component: PedidosManagerComponent;
  let fixture: ComponentFixture<PedidosManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
