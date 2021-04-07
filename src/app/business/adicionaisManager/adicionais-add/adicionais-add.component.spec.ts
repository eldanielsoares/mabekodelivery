import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaisAddComponent } from './adicionais-add.component';

describe('AdicionaisAddComponent', () => {
  let component: AdicionaisAddComponent;
  let fixture: ComponentFixture<AdicionaisAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionaisAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaisAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
