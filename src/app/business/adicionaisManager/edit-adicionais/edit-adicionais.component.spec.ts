import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdicionaisComponent } from './edit-adicionais.component';

describe('EditAdicionaisComponent', () => {
  let component: EditAdicionaisComponent;
  let fixture: ComponentFixture<EditAdicionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdicionaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdicionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
