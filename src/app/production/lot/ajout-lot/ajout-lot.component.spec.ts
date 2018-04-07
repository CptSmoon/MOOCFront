import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutLotComponent } from './ajout-lot.component';

describe('AjoutLotComponent', () => {
  let component: AjoutLotComponent;
  let fixture: ComponentFixture<AjoutLotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutLotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
