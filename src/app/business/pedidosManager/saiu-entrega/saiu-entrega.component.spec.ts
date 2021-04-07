import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaiuEntregaComponent } from './saiu-entrega.component';

describe('SaiuEntregaComponent', () => {
  let component: SaiuEntregaComponent;
  let fixture: ComponentFixture<SaiuEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaiuEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaiuEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
