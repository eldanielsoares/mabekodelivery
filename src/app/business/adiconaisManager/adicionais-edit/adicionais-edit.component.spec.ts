import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaisEditComponent } from './adicionais-edit.component';

describe('AdicionaisEditComponent', () => {
  let component: AdicionaisEditComponent;
  let fixture: ComponentFixture<AdicionaisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionaisEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
